# -*- coding: utf-8 -*-
from flask import Flask, request,jsonify,render_template
import requests
import json

app = Flask(__name__)

#从配置文件中settings加载配置
app.config.from_pyfile('settings.py')

@app.route("/", methods=["GET"])
def index():
    return render_template("chat.html")

@app.route("/chat", methods=["POST"])
def chat():
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {app.config['OPENAI_API_KEY']}",
    }

    def chat(prompt):
        data = {
            "messages": prompt,
            "model": "gpt-3.5-turbo",
            "max_tokens": 2048,
            "temperature": 0.5,
            "top_p": 1,
            "n": 1
        }
        response = requests.post(url=app.config["URL"], headers=headers, json=data)

        response_text = response.json()
        return response_text

    messages = request.form.get("prompt")
    # json串转对象
    messages = json.loads(messages)

    resp = chat(messages)

    return jsonify(resp["choices"][0]["message"])


if __name__ == '__main__':
    app.run(port=80)
