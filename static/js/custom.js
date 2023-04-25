// 封装弹窗layer组件等
var common_ops = {
  alert:function( msg ,cb ){
      layer.alert( msg,{
          yes:function( index ){
              if( typeof cb == "function" ){
                  cb();
              }
              layer.close( index );
          }
      });
  },
  confirm:function( msg,callback ){
      callback = ( callback != undefined )?callback: { 'ok':null, 'cancel':null };
      layer.confirm( msg , {
          btn: ['确定','取消'] //按钮
      }, function( index ){
          //确定事件
          if( typeof callback.ok == "function" ){
              callback.ok();
          }
          layer.close( index );
      }, function( index ){
          //取消事件
          if( typeof callback.cancel == "function" ){
              callback.cancel();
          }
          layer.close( index );
      });
  },
  tip:function( msg,target ){
      layer.tips( msg, target, {
          tips: [ 3, '#e5004f']
      });
      $('html, body').animate({
          scrollTop: target.offset().top - 10
      }, 100);
  }
};

// 功能
$(document).ready(function() {
  var chatBtn = $('#chatBtn');
  var chatInput = $('#chatInput');
  var chatWindow = $('#chatWindow');
  
  // 存储对话信息,实现连续对话
  var messages = [];

  // 检测是否是html代码的标志变量
  var checkHtmlFlag = false;

  // 转义html代码(对应字符转移为html实体)，防止在浏览器渲染
  function escapeHtml(html) {
    let text = document.createTextNode(html);
    let div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  }

  // 判断输出内容是否包含html标签
  function checkHtmlTag(str) {
    let pattern = /<\s*\/?\s*[a-z]+(?:\s+[a-z]+=(?:"[^"]*"|'[^']*'))*\s*\/?\s*>/i;  // 匹配HTML标签的正则表达式
    return pattern.test(str); // 返回匹配结果
  }
  
  // 添加请求消息到窗口
  function addRequestMessage(message) {
    $(".answer .tips").css({"display":"none"});    // 打赏卡隐藏
    chatInput.val('');
    let escapedMessage = escapeHtml(message);  // 对请求message进行转义，防止输入的是html而被浏览器渲染
    let requestMessageElement = $('<div class="row message-bubble"><img class="chat-icon" src="./static/images/avatar.png"><div class="message-text request">' +  escapedMessage + '</div></div>');
    chatWindow.append(requestMessageElement);
    let responseMessageElement = $('<div class="row message-bubble"><img class="chat-icon" src="./static/images/chatgpt.png"><div class="message-text response"><span class="loading-icon"></span></div></div>');
    chatWindow.append(responseMessageElement);
    chatWindow.animate({ scrollTop: chatWindow.prop('scrollHeight') }, 500);
  }
  
  // 添加响应消息到窗口,流式响应此方法会执行多次
  function addResponseMessage(message) {
    let lastResponseElement = $(".message-bubble .response").last();
    lastResponseElement.empty();
    let escapedMessage;
    if(checkHtmlTag(message)){  // 如果是html代码
      escapedMessage = marked(escapeHtml(message)); 
      checkHtmlFlag = true;
    }else{
      escapedMessage = marked(message);  // 响应消息markdown实时转换为html
    }
    lastResponseElement.append(escapedMessage);
    chatWindow.scrollTop(chatWindow.prop('scrollHeight'));
  }

  // 添加失败信息到窗口
  function addFailMessage(message) {
    let lastResponseElement = $(".message-bubble .response").last();
    lastResponseElement.empty();
    lastResponseElement.append(message);
    chatWindow.scrollTop(chatWindow.prop('scrollHeight'));
    messages.pop() // 失败就让用户输入信息从数组删除
  }
  
  // 处理用户输入
  chatBtn.click(function() {
    // 解绑键盘事件
    chatInput.off("keydown",handleEnter);
    
    // ajax上传数据
    let data = {};

    // 判断消息是否是正常的标志变量
    let resFlag = true;

    // 接收输入信息变量
    let message;
   
    // 判断是否使用自己的api key
    if ($(".key .ipt-1").prop("checked")){
      let apiKey = $(".key .ipt-2").val();
      if (apiKey.length < 20 ){
          common_ops.alert("请输入正确的 api key ！",function(){
            chatInput.val('');
            // 重新绑定键盘事件
            chatInput.on("keydown",handleEnter);
          })
          return
      }else{
        data["apiKey"] = apiKey
      }
    }

    message = chatInput.val();
    
    if (message.length == 0){
      common_ops.alert("请输入内容！",function(){
        chatInput.val('');
        // 重新绑定键盘事件
        chatInput.on("keydown",handleEnter);
      })
      return
    }

    addRequestMessage(message);
    // 将用户消息保存到数组
    messages.push({"role": "user", "content": message})
    // 收到回复前让按钮不可点击
    chatBtn.attr('disabled',true)
    data["prompt"] = JSON.stringify(messages)
    // 发送信息到后台
    $.ajax({
      url: '/chat',
      method: 'POST',
      data: data,
      xhrFields: {
        onprogress: function(e) {
          var res = e.target.responseText;
          let resJsonObj;
          try{
            resJsonObj = JSON.parse(res);  // 只有错误信息是json类型字符串,且一次返回
            if(resJsonObj.hasOwnProperty("error")){
              addFailMessage('<p class="error">' + resJsonObj.error.type + " : " + resJsonObj.error.message + '</p>');
              resFlag = false;
            }else{
              addResponseMessage(res);
            }
          }catch(e){
            addResponseMessage(res);
          }
        }
      },
      success:function(res){
        // 将最终回复添加到数组
        if (resFlag) {
          messages.push({"role": "assistant", "content": res})
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        addFailMessage('<p class="error">' + '出错啦！请稍后再试!' + '</p>');
      },
      complete : function(XMLHttpRequest,status){ 
         // 收到回复，让按钮可点击
         chatBtn.attr('disabled',false)
         // 重新绑定键盘事件
         chatInput.on("keydown",handleEnter); 
         
         if (checkHtmlFlag) {
            let lastResponseElement = $(".message-bubble .response").last();
            let lastResponseHtml = lastResponseElement.html();
            let newLastResponseHtml = lastResponseHtml.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, "\"");
            lastResponseElement.html(newLastResponseHtml);
         }
      }
    });
  });

  // Enter键盘事件
  function handleEnter(e){
    if (e.keyCode==13){
      chatBtn.click();
      e.preventDefault();  //避免回车换行
    }
  }

  // 绑定Enter键盘事件
  chatInput.on("keydown",handleEnter);
});