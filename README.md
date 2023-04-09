# ChatGPT-website

#### 介绍

简易版chatgpt网站，拿来即用，适合小白，让你十分钟搭建属于自己的chatgpt问答机器人！

#### 安装教程

本项目后端用flask快速搭建，可使用宝塔面板中的python项目管理器快速部署！

#### 使用说明

1.  本项目使用GPT-3.5-turbo,支持记录上下文实现连续对话！

2.  由于openai的api地区限制问题，项目部署请使用国外服务器，本项目使用现成开源api代理，只需替换api域名，可在大陆服务器部署。（使用openai官方api在本地跑此项目，使用代理对于python可能会出现ssl error问题，因此不建议在国内服务器上使用代理软件，建议使用现成的代理或者直接部署到国外服务器）。

3.  使用现有开源api代理，则只需在settings.py配置文件中加入自己的 openai 的api key即可，然后部署到大陆服务器就行！如有条件部署到国外服务器，请使用settings.py配置文件中的 openai 官方api接口。

#### 注意
1.  拒绝白嫖，如果此小项目帮助到了您，希望能得到您的star!
2.  项目开源代理：[https://github.com/geekr-dev/openai-proxy](https://github.com/geekr-dev/openai-proxy) 点个 Star 支持作者
3.  此项目适合小白，主打简洁，可不断完善！
4.  对于项目如有疑问，可点击项目页面“@联系我”，在我的博客中私信！
5.  此项目为紧急搭建，会不断完善页面效果！
6.  部署教程：https://blog.csdn.net/qq_57421630/article/details/129913170
7.  项目纯前端版本（零成本部署）：https://gitee.com/aniu-666/chat-gpt-website/tree/web/
#### 项目效果

![输入图片说明](%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE%E7%89%87.png)