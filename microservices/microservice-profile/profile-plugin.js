var mongoose = require('mongoose')


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



  const UserProfile = connection.model('UserProfile', require('./profile.schema'));



  this.add('role:profile,cmd:create', function(msg, respond) {
    return UserProfile.find({username:msg.username},function(err,retrievedProfiles){
      if(err) { return respond(err); }
      if(retrievedProfiles.length > 0) { return respond(null, {response: 'fail'}); }
      return UserProfile.create(msg, function(err, createdProfile) {
        if(err) { return respond(err); }
        return respond(null, {response: 'success', entity: createdProfile});
      })
    });
  });

  this.add('role:profile,cmd:getProfile', function(msg, respond) {
    // console.log("=============Inside plugin getProfile list msg==== ",msg);
    return UserProfile.find({username:msg.username}, function (err, retrievedProfile) {
      if(err) { return respond(err); }
      if(!err){
        retrievedProfile[0].username
      }
      return respond(null, {response: 'success', profile: retrievedProfile});
    });
  });


  this.add('role:profile,cmd:editProfile', function(msg, respond) {

      return UserProfile.update({username: msg.username},{$set:{name:msg.name,age: msg.age,useravatar:msg.useravatar,country:msg.country}},function(err,updatedProfile){
          if(err) { console.error("Error"); }
          return respond(null, {response: 'success', entity: updatedProfile});
        });

    });


  this.add('role:profile,cmd:dangerouslyDeleteAllProfile', function(msg, respond) {
    return UserProfile.remove({}, function(err) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success'});
    });
  });
};
