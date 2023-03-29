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

    var messages = [] // 存储对话信息

    // 添加用户消息到窗口
    function addUserMessage(message) {
      var messageElement = $('<div class="row message-bubble"><img class="chat-icon" src="../static/images/avatar.png"><p class="message-text">' + message + '</p></div>');
      chatWindow.append(messageElement);
      chatInput.val('');
      chatWindow.animate({ scrollTop: chatWindow.prop('scrollHeight') }, 500);
    }

    // 添加回复消息到窗口
    function addBotMessage(message) {
      var messageElement = $('<div class="row message-bubble"><img class="chat-icon" src="../static/images/chatgpt.png"><p class="message-text">' + message + '</p></div>');
      chatWindow.append(messageElement);
      chatInput.val('');
      chatWindow.animate({ scrollTop: chatWindow.prop('scrollHeight') }, 500);
    }

    // 处理用户输入
    chatBtn.click(function() {
      var message = chatInput.val();
      if (message.length == 0){
        common_ops.alert("请输入内容！")
        return
      }

      addUserMessage(message);

      // 将用户消息保存到数组
      messages.push({"role": "user", "content": message})

      // 收到回复前让按钮不可点击
      chatBtn.attr('disabled',true)

      // 发送信息到后台
      $.ajax({
        url: '/chat',
        method: 'POST',
        data: {
          "prompt": JSON.stringify(messages)
        },
        success: function(res) {
          addBotMessage(res.content);
          // 收到回复，让按钮可点击
          chatBtn.attr('disabled',false)
          // 将回复添加到数组
          messages.push(res)
        },
        error: function(jqXHR, textStatus, errorThrown) {
          addBotMessage('<span style="color:red;">' + '出错啦！请稍后再试!' + '</span>');
          chatBtn.attr('disabled',false)
          messages.pop() // 失败就让用户输入信息从数组删除
        }
      });
    });
});