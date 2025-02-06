# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, render_template, Response
import requests
import json
import os

app = Flask(__name__)

# 从配置文件中settings加载配置
app.config.from_pyfile('settings.py')


@app.route("/", methods=["GET"])
def index():
    return render_template("chat.html")


@app.route("/chat", methods=["POST"])
def chat():
    messages = request.form.get("prompts", None)
    apiKey = request.form.get("apiKey", None)
    apiUrl = request.form.get("apiUrl", None)
    model = request.form.get("model", "gpt-3.5-turbo")
    if messages is None:
        return jsonify({"error": {"message": "请输入prompts！", "type": "invalid_request_error", "code": ""}})

    # 依次从环境变量、配置文件获取key和代理url
    if apiKey is None:
        apiKey = os.environ.get('OPENAI_API_KEY', app.config["OPENAI_API_KEY"])

    if apiUrl is None:
        apiUrl = os.environ.get("OPENAI_API_URL", app.config["URL"])

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {apiKey}",
    }

    # json串转对象
    prompts = json.loads(messages)

    data = {
        "messages": prompts,
        "model": model,
        "max_tokens": 1024,
        "temperature": 0.5,
        "top_p": 1,
        "n": 1,
        "stream": True,
    }

    try:
        resp = requests.post(
            url=apiUrl + "/v1/chat/completions",
            headers=headers,
            json=data,
            stream=True,
            timeout=(10, 10)  # 连接超时时间为10秒，读取超时时间为10秒
        )
    except requests.exceptions.Timeout:
        return jsonify({"error": {"message": "请求超时，请稍后再试！", "type": "timeout_error", "code": ""}})

    # 迭代器实现流式响应
    def generate():
        errorStr = ""
        for chunk in resp.iter_lines():
            if chunk:
                streamStr = chunk.decode("utf-8").replace("data: ", "")
                try:
                    streamDict = json.loads(streamStr)  # 说明出现返回信息不是正常数据,是接口返回的具体错误信息
                except:
                    errorStr += streamStr.strip()  # 错误流式数据累加
                    continue

                # 应对部分中转接口错误信息一次返回
                try:
                    delData = streamDict["choices"][0]
                except:
                    yield streamStr

                if delData["finish_reason"] is not None:
                    break
                else:
                    # 返回 deepseek R1 推理过程
                    if "reasoning_content" in delData["delta"] and delData["delta"]["reasoning_content"] is not None:
                        respStr = delData["delta"]["reasoning_content"]
                    # 返回正式结果
                    elif "content" in delData["delta"] and delData["delta"]["content"] is not None:
                        respStr = delData["delta"]["content"]
                        # print(respStr)
                    if respStr is not None:
                        yield respStr

        # 如果出现错误，此时错误信息迭代器已处理完，app_context已经出栈，要返回错误信息，需要将app_context手动入栈
        if errorStr != "":
            with app.app_context():
                yield errorStr

    return Response(generate(), content_type='text/event-stream')


if __name__ == '__main__':
    app.run(port=5000, debug=True)
