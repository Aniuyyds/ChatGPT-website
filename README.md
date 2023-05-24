# ChatGPT-website

## 介绍

简易版 `ChatGPT` 网站，拿来即用，适合小白，让你十分钟搭建属于自己的 `ChatGPT` 问答机器人！

## 安装教程

本项目后端用 `flask` 快速搭建，可使用宝塔面板中的python项目管理器快速部署！

## 使用说明

1. 本项目支持 `GPT-3.5-turbo` 和 `GPT-4`，支持记录上下文实现连续对话！

2. 本项目支持流式响应，`markdown` 实时转换为 `html`！

3. 由于 `OpenAI` 的 `api` 地区限制问题，项目部署请使用国外服务器，本项目使用现成开源 api 代理，只需替换 api 域名，可在大陆服务器部署。（使用 `OpenAI` 官方 `api` 在本地跑此项目，使用代理对于 `python` 可能会出现 `ssl error` 问题，因此不建议在国内服务器上使用代理软件，建议使用现成的代理或者直接部署到国外服务器）。

4. 使用现有开源 `api` 代理，则只需在 `settings.py` 配置文件中加入自己的 `OpenAI`  的 `api key` 即可，然后部署到大陆服务器就行！如有条件部署到国外服务器，请使用 `settings.py` 配置文件中的 `OpenAI` 官方 `api` 接口。

## 23 年 5.12 日更新

 1. 可选多种页面主题。
 2. 可在本地保存自己的 `api key` 使用。如果本地不输入 `api key`，则默认使用 `settings.py` 配置文件中的 `api key`。
 3. 可在本地保存历史对话记录，即页面刷新不会消失，默认关闭，可在页面设置中开启。
 4. 可选择是否开启上下文连续对话，默认开启，可在页面设置中关闭。
 5. 添加删除按钮，可自己清空页面对话。
 6. 添加截图保存按钮，可点击将对话数据保存为图片。
 7. 加入语法高亮功能，同时markdown代码块实时转html标签。
 8. 代码块添加一键复制功能。
 9. 上下文对话状态下为节约 `tokens` ，当对话超过4轮后，则选取最新3轮作为上下文发送。为避免有人不点击删除按钮而导致页面积累大量对话，跟 `New Bing` 一样，当上下文对话超过20轮，则无法继续发送，会提示点击删除按钮清空页面数据！
 10. 美化页面，优化页面布局使得不同设备更好的自适应。

## 23 年 5.24 日更新

 1. 修复截图宽度很宽的问题。
 2. 添加 `GPT-4` 模型，需要有 `gpt-4` 权限的 `api key`。
 3. 添加停止响应按钮，输出结果不满意可停止响应。

## 注意

1. 开发不易，拒绝白嫖，如果此小项目帮助到了您，希望能得到您的 `star` ！
2. 页面可任各位修改，希望留下项目地址，为此项目吸引更多的 `star` !
3. 项目使用开源代理：[https://github.com/geekr-dev/openai-proxy](https://github.com/geekr-dev/openai-proxy) ，点个 `star` 支持作者
4. 此项目适合小白，主打简洁，可不断完善！
5. 对于项目如有疑问，可加下面 `QQ` 群交流！
6. 部署教程：https://blog.csdn.net/qq_57421630/article/details/129913170
7. 项目纯前端版本（零成本部署）：https://gitee.com/aniu-666/chat-gpt-website/tree/web/

## 学习交流 

### <font  color="#dd0000">qq 群号 ：799160455 </font>

## 项目效果

### PC端

<table>
    <tr>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E7%94%B5%E8%84%91%E7%AB%AF%E5%9B%BE%E7%89%87%E4%B8%80.png" width="400">图1</center></td>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E7%94%B5%E8%84%91%E7%AB%AF%E5%9B%BE%E7%89%87%E4%BA%8C.png" width="400">图2</center></td>
    </tr>
    <tr>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E7%94%B5%E8%84%91%E7%AB%AF%E5%9B%BE%E7%89%87%E4%B8%89.png" width="400">图3</center></td>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E7%94%B5%E8%84%91%E7%AB%AF%E5%9B%BE%E7%89%87%E5%9B%9B.png" width="400">图4</center></td>
    </tr>
</table>

### 手机端

<table>
    <tr>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E6%89%8B%E6%9C%BA%E7%AB%AF%E5%9B%BE%E4%B8%80.png" width="400">图1</center></td>
        <td ><center><img src="./%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B%E5%9B%BE/%E6%89%8B%E6%9C%BA%E7%AB%AF%E5%9B%BE%E4%BA%8C.png" width="400">图2</center></td>
    </tr>
</table>
