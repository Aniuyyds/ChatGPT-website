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
  var messages = []

  // 转义html代码，防止在浏览器渲染
  function escapeHtml(html) {
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  }

  /// 添加消息到窗口
  function addMessage(message,imgName) {
    $(".answer .tips").css({"display":"none"});    // 打赏卡隐藏
    chatInput.val('');
    var escapedMessage;
    if (imgName == "avatar.png"){
      escapedMessage= escapeHtml(message);  // 对请求message进行转义，防止输入的是html而被浏览器渲染
    }else if(imgName == "chatgpt.png"){
      escapedMessage= marked(message);  // 使用marked.js对响应message的markdown格式转换为html
    }
    var messageElement = $('<div class="row message-bubble"><img class="chat-icon" src="./static/images/' + imgName + '"><div class="message-text">' +  escapedMessage + '</div></div>');
    chatWindow.append(messageElement);
    chatWindow.animate({ scrollTop: chatWindow.prop('scrollHeight') }, 500);
  }

  // 请求失败不用转义html
  function addFailMessage(message) {
    $(".answer .tips").css({"display":"none"});      // 打赏卡隐藏
    chatInput.val('');
    var messageElement = $('<div class="row message-bubble"><img class="chat-icon" src="../static/images/chatgpt.png"><div class="message-text error">' +  message + '</div></div>');
    chatWindow.append(messageElement);
    chatWindow.animate({ scrollTop: chatWindow.prop('scrollHeight') }, 500);
  }
  
  // 处理用户输入
  chatBtn.click(function() {
    // 解绑键盘事件
    chatInput.off("keydown",handleEnter);
    
    // ajax上传数据
    var data = {}
   
    // 判断是否使用自己的api key
    if ($(".key .ipt-1").prop("checked")){
      var apiKey = $(".key .ipt-2").val();
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

    var message = chatInput.val();
    if (message.length == 0){
      common_ops.alert("请输入内容！",function(){
        chatInput.val('');
        // 重新绑定键盘事件
        chatInput.on("keydown",handleEnter);
      })
      return
    }

    addMessage(message,"avatar.png");

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
      success: function(res) {
        if(res.hasOwnProperty("error")){
          addFailMessage('<p>' + res.error.type + ": " + res.error.message + '</p>');
          chatBtn.attr('disabled',false)
          chatInput.on("keydown",handleEnter);
          messages.pop() // 失败就让用户输入信息从数组删除
        }else{
          addMessage(res.content,"chatgpt.png");
          // 收到回复，让按钮可点击
          chatBtn.attr('disabled',false)
          // 重新绑定键盘事件
          chatInput.on("keydown",handleEnter);
          // 将回复添加到数组
          messages.push(res)
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        addFailMessage('<p>' + '出错啦！请稍后再试!' + '</p>');
        chatBtn.attr('disabled',false)
        chatInput.on("keydown",handleEnter);
        messages.pop() // 失败就让用户输入信息从数组删除
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