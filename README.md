# ChatGPT-website

## 介绍

简易版 `ChatGPT` 网站，拿来即用，适合小白，让你十分钟搭建属于自己的 `ChatGPT` 问答机器人！

本项目是`ChatGPT-website`的镜像地址，只用于使用`render` 部署！

其他部署方式请访问原仓库：https://gitee.com/aniu-666/chat-gpt-website , 欢迎点 Star ! 
## 使用说明

1. 本项目后端用 `flask` 快速搭建，可使用`render` 云平台快速免费部署！

2. 本项目支持 `GPT-3.5-turbo` 和 `GPT-4`，支持记录上下文实现连续对话！

3. 本项目支持流式响应，`markdown` 实时转换为 `html`！

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
3. 此项目适合小白，主打简洁，可不断完善！
4. 对于项目如有疑问，可加下面 `QQ` 群交流！
5. 部署教程（零成本部署）：https://github.com/Aniuyyds/ChatGPT-website/blob/master/%E9%83%A8%E7%BD%B2%E6%95%99%E7%A8%8B/%E6%95%99%E7%A8%8B.md
7. 项目纯前端版本（零成本部署）：https://gitee.com/aniu-666/chat-gpt-website/tree/web/

## 学习交流 

### 全栈学习交流1群：[799160455](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=jj15fOLBvm5U97kuj-Jgvvld2eDACl2o&authKey=fcll1nLa0V9wFMPkJGurdv%2FX%2FHlasFVHpS9vmtuFLofiqBD%2Fgl5fcjXBmg4E3Ovc&noverify=0&group_code=799160455) （已满员）

### 全栈学习交流2群：[879763865](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=mVTtPhPE_-BUOEbNu_IuO-4FZoMR6m43&authKey=heN7%2BG%2FFLoPj1tZ%2Blg%2FWS11WrzYkHkMTVgv9qg9aPGlR5pbEOmzvTBv7npYU1d56&noverify=0&group_code=879763865) 

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
