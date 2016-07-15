
// var globalQueueClient = require('seneca')();
//  globalQueueClient.use('redis-store',{
//    uri:'redis://localhost:6379'
//  });
  var globalQueue = {};

module.exports = function(options){

  var self= this;
  self.add('role:provisioner,action:queue',function(msg,respond){
    console.log('\n Inside role provisioner action queue \n');
   var provisionerResponseChannelMicroservice = require('seneca')()
                      .use('redis-transport')
                      .client({type:'redis',pin:'role:*,action:gameInitiated'});
    // console.log('\n ==========Game Provisioner Initialized=========== \n')
    var tournamentId = msg.tournamentId;

    //add the users to a global queue with tournament id

    if(!globalQueue[tournamentId])
    {
      globalQueue[tournamentId] = [msg.username]
    }
    else{
      globalQueue[tournamentId].push(msg.username);
    }
    console.log('\n Tournament Id : '+msg.tournamentId+'\n');
    console.log('\n Users are : '+globalQueue[msg.tournamentId]+'\n')
    //If found x or more members
    if(globalQueue[tournamentId].length==3){
      var gameManager = require('seneca')();
      var gameId = Math.ceil(Math.random()*1231);
      // console.log(' \n Since players are more than 2, spawning game manager.')
      respond(null,{answer:'gameInitiated'});
      gameManager.use(require('./gameManagerPlugin'),
                                {
                                  gameId: gameId,
                                  users: globalQueue[msg.tournamentId],
                                  tournamentId: msg.tournamentId,
                                  callback: gameManagerReady
                                }
                    );


    }
    else{
      respond(null,{answer:'queued'})
    }

         function gameManagerReady(){
           console.log('\n========== Inside game manager ready ======\n');
            setTimeout(function(){
              //Send ids back to players.
              var count=0;

              // console.log('\n====GLOBAL QUEUE '+JSON.stringify(globalQueue)+'\n')

              // console.log('\n==========GLOBAL QUEUE CONTAINS: '+globalQueue[msg.tournamentId]+'\n')
              for(var user of globalQueue[msg.tournamentId]){
                // setTimeout(function(){
                  console.log('\n========= Sending game id back to : '+user+' at '+Date.now()+' === \n');
                  setTimeout(function(){},3000);
                  provisionerResponseChannelMicroservice.act('role:'+user+',action:gameInitiated',{gameId:gameId},function(err,response){
                    if(err) return console.log(err);
                    // console.log('\n===Count after sending the game id'+(count)+'\n')
                    // console.log('\n Game set up for user '+user+'\n');
                  })
                // },1000)
                // console.log('\n===Count before sending the game id '+(++count)+'\n')

              }

              delete globalQueue[msg.tournamentId];

              // console.log('\n Global queue with the topic is now: '+globalQueue[msg.tournamentId]+'\n')
              // console.log('\n Game Manager is ready now. \n');

            },10000);


        }
  })

}
