exports = module.exports = function(options) {
  // console.log(options);

  var self = this;

  self.roomId = options.chatroomId;
  self.socket = options.socket;
  console.log("inside chatr middleware plugin ,the chatroomId is ======",self.roomId);

  const tx = require('seneca')();
  const rx = require('seneca')();

  rx.use('redis-transport')
    .add('role:chat,roomId:'+self.roomId+',cmd:send',function(msg,respond){
    console.log('recieved msg chatroom1:'+msg.msg);
    console.log('received username inside chatroom:',msg.user);
    self.socket.emit('received_msg',msg.msg);
    return respond(null,{response:'success',message:msg.msg});
  })

    .listen({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'})
    .ready(function(){
      console.log('=====Setup TX=====');
      tx.use('redis-transport');
      tx.client({type:'redis',pin:'role:chat,roomId:'+self.roomId+',cmd:*'});
  });

  this.add('role:chat,cmd:sendMsg', function(msg, respond) {
            return tx.ready(function(err){
            if(err) { return respond(err); }
            console.log("========Inside Middleware No Act on plugin happened=====");
            return tx.act('role:chat,roomId:'+self.roomId+',cmd:send',{msg:msg.msg,user:msg.user},respond);
          });
    });

  this.add('role:chat,cmd:unsubscribe',function(msg,respond){
      console.log("=====Inside Plugin to, msg is to unsubscribe the channel====",msg.msg);
      rx.close();
      tx.close();
          return respond(null,{response:'success',message:'unsubscibed'})

  });

  }
