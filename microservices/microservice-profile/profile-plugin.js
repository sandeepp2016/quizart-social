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

  const UserProfile = connection.model('UserProfile', require('./profile.schema'));



  this.add('role:profile,cmd:create', function(msg, respond) {
    return UserProfile.create(msg, function(err, createdProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: createdProfile});
    });
  });

  this.add('role:profile,cmd:retrieveById', function(msg, respond) {
    return UserProfile.findById(msg.id, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', entity: retrievedProfile});
    });
  });

  this.add('role:profile,cmd:getProfile', function(msg, respond) {
    console.log("=============Inside plugin getProfile list msg==== ",msg);
    return UserProfile.find({username:msg.username}, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success', profile: retrievedProfile});
    });
  });

  this.add('role:profile,cmd:editProfile', function(msg, respond) {
    return UserProfile.find({username:msg.username}, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      else{
        retrievedProfile[0].name= msg.name;
        retrievedProfile[0].imageLink= msg.imageLink;
        retrievedProfile[0].age= msg.age;
        retrievedProfile[0].country= msg.country;
        retrievedProfile[0].save(function(err, updatedProfile) {
          if(err) { return respond(err); }
          return respond(null, {response: 'success',entity: updatedProfile});
        });
      }
      });
  });

  this.add('role:profile,cmd:dangerouslyDeleteAllProfile', function(msg, respond) {
    return UserProfile.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });
};
