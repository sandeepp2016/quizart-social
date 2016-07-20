exports = module.exports = function(options) {
  // console.log(options);

  var self = this;

  self.roomId = options.chatroomId;
  self.socket = options.socket;
  console.log("inside chatr middleware plugin ,the chatroomId is ======",self.roomId);

  const tx = require('seneca')();
  const rx = require('seneca')();
  const rx1 = require('seneca')();

  rx.use('redis-transport')
    .add('role:chat',function(msg,respond){
    console.log('recieved msg chatroom1:'+msg.message.text);
    console.log('received username inside chatroom:',msg.message.sentBy);
    self.socket.emit('received_msg',msg.message.text);
    return respond(null,{response:'success',message:msg.message.text});
  })

    .listen({type:'redis',pin:'role:chat'})
    .ready(function(){
      console.log('=====Setup TX=====');
      tx.use('redis-transport');
      tx.client({type:'redis',pin:'role:chat',host:'172.23.238.253'}); //,host:'172.23.238.253'
  });

  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
            return tx.ready(function(err){
            if(err) { return respond(err); }
            console.log("========Inside Middleware Act on plugin happened=====");
            console.log("========Inside Middleware the msg got from app.js",msg.message);
            var message = msg.message;
            // return tx.act('role:chat',{message:message},respond);
            return tx.act('role:chat',{message:message},function(err,res){
              if(err) { console.log("========Error inside Middleware Plugin =========",err);return respond(err);}
              return respond(null,{response:'success',message:"Message Published"});
            });
          });
    });

  this.add('role:chat,cmd:unsubscribe',function(msg,respond){
      console.log("=====Inside Plugin to, msg is to unsubscribe the channel====",msg.msg);
      rx.close();
      tx.close();
          return respond(null,{response:'success',message:'unsubscibed'})

  });

  }
