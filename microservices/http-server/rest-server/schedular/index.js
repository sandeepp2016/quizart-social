var context = require('../context');
var mesh = context.mesh;
var count = 0;
var CronJob = require('cron').CronJob;

var cronJob = function() {
  if(count == 0) {
    var job = new CronJob('0 */1 * * * *', function() {
      console.log('\n\nSchedular job started!!!');
      console.log('Count is: '+count);
      console.log('\n\n');
      count++;
        mesh.act('role:tournaments,cmd:retrieveAll', function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
          if(response.response !== 'success') { return res.status(404).send(); }
          var tournaments = response.entity;
          var date = (new Date()).getTime();
          for(var i=0;i<tournaments.length;i++) {
            var endDate = new Date(tournaments[i].levels[tournaments[i].currentLevel-1].tourEndDate).getTime();
            if(date>endDate) {
              mesh.act('role:tournaments,cmd:updateWinners',{id:tournaments[i]._id}, function(err, response) {
                if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
                if(response.response !== 'success') { return res.status(404).send(); }
                console.log('Step 2 completed');
                if(!response.entity.isComplete) {
                  mesh.act('role:tournaments,cmd:registerPlayersHigherLevels',{id:response.entity._id}, function(err, response) {
                    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
                    if(response.response !== 'success') { return res.status(404).send(); }
                    console.log('\n\n\n\n\nStep 3 completed:');
                    console.log(JSON.stringify(response.entity));
                    console.log('\n\n\n\n\n');
                  });
                }
              });
            }
          }
        });
      }, function () {
        /* This function is executed when the job stops */
    	console.log('Final!!!');
      },
      true /* Start the job right now */
    );
  }
}

exports = module.exports = cronJob;
