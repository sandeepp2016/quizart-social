
// var globalQueueClient = require('seneca')();
//  globalQueueClient.use('redis-store',{
//    uri:'redis://localhost:6379'
//  });
  var index = 0;
  var tournamentQueue = {};
  var topicQueue = {};

module.exports = function(options){

  var self= this;
  self.add('role:provisioner,action:queue',function(msg,respond){
    console.log('\n Inside role provisioner action queue \n');
   var provisionerResponseChannelMicroservice = require('seneca')()
                      .use('redis-transport')
                      .client({type:'redis',pin:'role:*,action:gameInitiated'});
    // console.log('\n ==========Game Provisioner Initialized=========== \n')
    var tournamentId = msg.tournamentId;
    console.log('Inside game provisioner plugin');
    console.log('\n\n'+msg.knockoutId+'\n\n');

    //add the users to a global queue with tournament id

    if(msg.isTournament) {
      if(!tournamentQueue[msg.knockoutId])
      {
        tournamentQueue[msg.knockoutId] = [msg.username]
      }
      else{
        tournamentQueue[msg.knockoutId].push(msg.username);
      }

      console.log('\n Tournament Id : '+msg.tournamentId+'\n');
      console.log('\n Users are : '+tournamentQueue[msg.knockoutId]+'\n')
      //If found x or more members
      if(tournamentQueue[msg.knockoutId].length==2){
        var users = tournamentQueue[msg.knockoutId].slice();
        tournamentQueue[msg.knockoutId] = [];
        startGame(users,msg.tournamentId,msg.knockoutId,msg.isTournament);
      }
      else{
        respond(null,{answer:'queued'})
      }
    } else {
      if(!topicQueue[msg.tournamentId])
      {
        topicQueue[msg.tournamentId] = [msg.username]
      }
      else{
        topicQueue[msg.tournamentId].push(msg.username);
      }

      console.log('\n Tournament Id : '+msg.tournamentId+'\n');
      console.log('\n Users are : '+topicQueue[msg.tournamentId]+'\n')
      //If found x or more members
      if(topicQueue[msg.tournamentId].length==2){
        var users = topicQueue[msg.tournamentId].slice();
        topicQueue[msg.tournamentId] = [];
        startGame(users,msg.tournamentId,msg.knockoutId,msg.isTournament);
      }
      else{
        respond(null,{answer:'queued'})
      }
    }

    function startGame(users,tournamentId,knockoutId,isTournament) {
      var gameManager = require('seneca')();
      var gameId = Math.ceil(Math.random()*1231);
      // console.log(' \n Since players are more than 2, spawning game manager.')
      respond(null,{answer:'gameInitiated'});
      console.log('Inside game provisioner plugin');
      console.log('\n\n'+(isTournament)+' '+(knockoutId)+'\n\n');
      gameManager.use(require('./gameManagerPlugin'),
                                {
                                  gameId: gameId,
                                  users: users,
                                  tournamentId: tournamentId,
                                  knockoutId: knockoutId,
                                  isTournament: isTournament,
                                  callback: gameManagerReady
                                }
                    );
    }

     function gameManagerReady(users,gameId){
       console.log('\n========== Inside game manager ready ======\n');
        setTimeout(function(){
          //Send ids back to players.
          var count=0;

          // console.log('\n====GLOBAL QUEUE '+JSON.stringify(globalQueue)+'\n')

          // console.log('\n==========GLOBAL QUEUE CONTAINS: '+globalQueue[msg.tournamentId]+'\n')
          for(var user of users){
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

          // console.log('\n Global queue with the topic is now: '+globalQueue[msg.tournamentId]+'\n')
          // console.log('\n Game Manager is ready now. \n');

        },10000);


    }
  })

}
