var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Tournament = connection.model('Tournament', require('./tournament.schema'));

  this.add('role:tournaments,cmd:dangerouslyDeleteAllTournaments', function(msg, respond) {
    return Tournament.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:tournaments,cmd:create', function(msg, respond) {
    return Tournament.create(msg, function(err, createdTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: createdTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveById', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:retrieveAll', function(msg, respond) {
    Tournament.find({isComplete: false}, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:registerPlayerFirstLevel', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      retrievedTournament.levels[0].registeredPlayers.push({userId: msg.userId});
      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:registerPlayersHigherLevels', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var currentLevel = retrievedTournament.currentLevel-1;
      retrievedTournament.levels[currentLevel].registeredPlayers = retrievedTournament.levels[currentLevel-1].levelWinners;
      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:updateWinners', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var currentLevel = retrievedTournament.currentLevel-1;
      retrievedTournament.levels[currentLevel].gamePlayedPlayers.sort(
        function(a, b) {
            return b.score - a.score;
        }
      )
      for(var i=0;i<(retrievedTournament.levels[currentLevel].gamePlayedPlayers.length*(retrievedTournament.eliminationPercentagePerGame/100));i++) {
        retrievedTournament.levels[currentLevel].levelWinners.push({userId: retrievedTournament.levels[currentLevel].gamePlayedPlayers[i].userId});
      }
      if(retrievedTournament.currentLevel==retrievedTournament.noOfLevels) {
        retrievedTournament.isComplete = true;
      } else {
        retrievedTournament.currentLevel+=1;
      }

      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

  this.add('role:tournaments,cmd:updateTournamentLeaderboard', function(msg, respond) {
    Tournament.findById(msg.id, function (err, retrievedTournament) {
      if(err) { return respond(err); }
      var currentLevel = retrievedTournament.currentLevel-1;
      var leaderboard = msg.leaderboard;
      for(var i=0;i<leaderboard.length;i++) {
        retrievedTournament.levels[currentLevel].gamePlayedPlayers.push(leaderboard[i]);
      }
      retrievedTournament.save(function (err) {
        if(err) {
            console.error('ERROR!');
        }
      });
      return respond(null, {response: 'success', entity: retrievedTournament});
    });
  });

};
