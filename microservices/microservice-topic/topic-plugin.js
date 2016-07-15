var mongoose = require('mongoose')

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

  function hashPassword(password, callback) {
    return bcrypt.hash(password, 10, callback);
  }

  function verifyPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, callback);
  }

  const Topic = connection.model('topics_collection',require('./topic.schema'),'topics_collection');



  this.add('role:topic,cmd:getTopic', function(msg, respond) {
    return Topic.find({_id:msg.id}, function (err, retrievedTopic) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', topic: retrievedTopic});
    });
  });


  this.add('role:topic,cmd:dangerouslyDeleteAllTopic', function(msg, respond) {
    return Topic.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });
};
