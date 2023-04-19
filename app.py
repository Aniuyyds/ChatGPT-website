# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, render_template
import requests
import json

app = Flask(__name__)

# 从配置文件中settings加载配置
app.config.from_pyfile('settings.py')

@app.route("/", methods=["GET"])
def index():
    return render_template("chat.html")


@app.route("/chat", methods=["POST"])
def chat():
    try:
        messages = request.form.get("prompt", None)
        apiKey = request.form.get("apiKey", None)

        if messages is None:
            return jsonify({"error": {"message": "请输入prompt!", "type": "invalid_request_error"}})

        if apiKey is None:
            apiKey = app.config['OPENAI_API_KEY']

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {apiKey}",
        }

        # json串转对象
        prompt = json.loads(messages)

        data = {
            "messages": prompt,
            "model": "gpt-3.5-turbo",
            "max_tokens": 2048,
            "temperature": 0.5,
            "top_p": 1,
            "n": 1,
        }
        resp = requests.post(url=app.config["URL"], headers=headers, json=data).json()
        return jsonify(resp["choices"][0]["message"])
    except KeyError:
        return jsonify(resp)

if __name__ == '__main__':
    app.run(port=5000)
