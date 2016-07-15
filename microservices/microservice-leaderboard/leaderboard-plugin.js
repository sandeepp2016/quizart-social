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

  const Leaderboard = connection.model('Leaderboard', require('./leaderboard.schema'));

  this.add('role:leaderboards,cmd:dangerouslyDeleteAllLeaderboards', function(msg, respond) {
    return Leaderboard.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });

  this.add('role:leaderboards,cmd:create', function(msg, respond) {
    return Leaderboard.create(msg, function(err, createdLeaderboard) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: createdLeaderboard});
    });
  });

  this.add('role:leaderboards,cmd:retrieveById', function(msg, respond) {
    Leaderboard.findById(msg.id, function (err, retrievedLeaderboard) {
      if(err) { return respond(err); }
      if(!retrievedLeaderboard) { return response(null,{response: 'fail'}); }
      return respond(null, {response: 'success', entity: retrievedLeaderboard});
    });
  });

  this.add('role:leaderboards,cmd:retrieveAll', function(msg, respond) {
    Leaderboard.find({}, function (err, retrievedLeaderboard) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedLeaderboard});
    });
  });

};
