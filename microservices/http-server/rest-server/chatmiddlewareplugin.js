exports = module.exports = function(socket) {

  var context = require('./context');
  var mesh = context.mesh;
  var self = this;

  var subscriber = require('redis').createClient(6379, '172.23.238.253');
  var publisher = require('redis').createClient(6379, '172.23.238.253');

  self.socket = socket;

    socket.on('create_room', function(userids){
      console.log("Inside the Middleware, the user ids got to act on the plugin======== ",userids);
      var channelId = false;
           if(userids.length>1){
             mesh.act('role:chat,cmd:joinprivateroom',{ids:userids}, function(err, response){
                 if(err) { console.error('===== ERR: ', err, ' =====');  }
                 console.log("Inside App.js getting room ID===",response.roomId[0].object);
                 channelId = response.roomId[0].object ;
                 subscriber.subscribe(channelId);

                 socket.emit('channelId',channelId);
             });
           }
           else{
             console.log("The ids recieved for group inside Middleware is",userids);
             console.log("The ids recieved for group inside Middleware is",userids[0]);
             channelId = userids;
             subscriber.subscribe(channelId);
             socket.emit('channelId',channelId);
           }
           subscriber.on('message',function(channel,message){
               console.log("Subscribed to the Channel:",channel);
               var message1 = JSON.parse(message);
               console.log("message received and the command is ",message1.command);
               if(message1.command === "sendMessage"){
                 console.log("Inside loop to send socket emit");
                  socket.emit('received_msg',message1);
               }
               else if(message1.command === "retrieveHistory"){
                 console.log("inside retrieved History is ",message1);
                 socket.emit('retrievedHistory',message1);
               }
           });
        });

      socket.on('retrieveHistory' , function(channelid){
        console.log("Inside Middleware, to retrieve history, the channel id sent is:",channelid[0]);
        var message =
          {
            content : channelid[0],
            command: 'retrieveHistory'
          };
        publisher.publish('uuidgenerator2',JSON.stringify({message:message}));
      });

      socket.on('chat_message', function(msg){
          console.log("Inside Middleware message from client via socket====",msg);
          var message =
            {
              content : msg.topicid[0],
              text : msg.msg,
              command: 'sendMessage',
              sentBy: msg.user
            };
            publisher.publish('uuidgenerator2',JSON.stringify({message:message}));
      });
  };
