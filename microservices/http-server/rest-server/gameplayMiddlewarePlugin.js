
module.exports = function(options){
  var self = this;
  self.username = options.username;
  self.tournamentId = options.tournamentId;
  self.socket = options.socket;

  var broadcastListener = require('seneca')();
  broadcastListener.use('redis-transport');

  var provisionerClient = require('seneca')();
  provisionerClient.use('redis-transport');

  var responseClient = require('seneca')();
  responseClient.use('redis-transport');

  var readyCount=0;
  var requestProvisioner=0;

  // console.log('\n Initialized count to 0 for socket id'+options.socket.id+'\n')
  var count =0;
  var gameId ;
  console.log('\nGame Initiate Listener set for : '+self.username+ '\n');
  self.add('role:'+self.username+',action:gameInitiated',function(msg,respond){
    // // console.log('\nCalling the provisioner '+(++count)+' times \n')

    var pin = 'role:'+self.username+',action:gameInitiated';
    console.log('\nListening on Pin : '+pin+' at '+Date.now()+'\n')
    console.log('\nInside game initiated instance with game id:'+msg.gameId+'\n')
    gameId = msg.gameId;

    // // console.log('\n=====RECEIVED GAME ID: '+gameId+'====\n');

    respond(null,{answer:'received'});


    //Create a broadcast listener for this game.
    console.log('\n=========Setting up broadcast listener for : '+self.username+'=====\n');
    broadcastListener
    .add('gameId:'+gameId+',role:broadcast,action:gameStarting',function(msg,gameStartingCallback){
      console.log('\n=============Received game Starting broadcast . Emitting to socket.===\n')
      self.socket.emit('gameStarting',5);
      gameStartingCallback(null,{answer:'emitted'});
    })
    .add('gameId:'+gameId+',role:broadcast,action:newQuestion',function(msg,done){
      // // console.log('\n=====RECEIVED QUESTION: '+ msg.question + ' with game id: '+gameId+'=====\n');

      self.socket.emit('newQuestion',{msg:msg.question});
      done(null,{answer:'QuestionReceived'})
    })
    .add('gameId:'+gameId+',role:broadcast,action:leaderboard',function(msg,leaderboardCallback){
      self.socket.emit('leaderboard',msg.id);
      leaderboardCallback(null,{answer:'received leaderboard'});
    })
    .use('entity')
    .listen({type:'redis',pin:'gameId:'+gameId+',role:broadcast,action:*'})
    .ready(function(){
       console.log('\n=========Set up broadcast listener for : '+self.username+'=====\n');
       console.log('\n=====2. Broadcast ready '+ Date.now() +'=======\n');
       responseClient.client({type:'redis',pin:'role:'+self.username+',gameId:'+gameId+',action:*'})
         .ready(function() {
           console.log('\n=====3. Sending the ping at '+ Date.now() +'=======\n');
           responseClient.act('role:'+self.username+',gameId:'+gameId+',action:ping',function(err,response){
             if(err) return console.log(err);
             // console.log('\n Received '+response.answer+' from game manager.\n');
           })
         });
     });

  })
  .listen({type:'redis',pin:'role:'+self.username+',action:gameInitiated'})
  .ready(function(){
    console.log('\n ==============1. Pin Receiver ready ========\n');
    setTimeout(function(){
      provisionerClient.client({type:'redis',pin:'role:provisioner,action:queue'})
        .act('role:provisioner,action:queue',{username:self.username,tournamentId:self.tournamentId},function(err,response){

          if(err) return console.log(err);

            self.socket.emit('queued','you are queued');
      })

    },2000)
  });

  self.add('role:user,action:answer',function(msg,callbackToSocket){
    console.log('\n=====Sending answer to game manager as '+msg.answer+'\n ');
    responseClient.act('role:'+self.username+',gameId:'+gameId+',action:answer',{answer:msg.answer},function(err,response){
      console.log('\n=========Emitting right answer to socket as: '+response.respondToQuestion+'\n')
      self.socket.emit('yourAnswer',{answer:response.respondToQuestion})
      if(err) return console.log(err);
      callbackToSocket(null,{answer:response.respondToQuestion});
       console.log('\n Sending answer to socket\n');
      console.log('\n Your answer is : '+msg.answer+'\n');
      console.log('\n Game manager responded : '+response.respondToQuestion+'\n');
    })
  })

}
