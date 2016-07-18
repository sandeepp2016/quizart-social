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

  const Friend = connection.model('Friend', require('./friend.schema'));
  const UserProfile = connection.model('UserProfile', require('./profile.schema'));

  this.add('role:friend,cmd:addAsFriend', function(msg, respond) {
    console.log("=============Inside plugin addAsFriend msg==== ",msg);
    console.log("=============Inside plugin addAsFriend msg username of the person adding the friend==== ",msg.subject[0]);
    return Friend.create(msg, function (err, createdFriend) {
      if(err) { return respond(err); }
      return UserProfile.update({username: msg.subject[0]},{$addToSet:{friends:msg.subject[1]}},function(err,updatedProfile){
          if(err) { console.error("Error"); }
          return respond(null, {response: 'success', frienddata: createdFriend});
    });
      // return respond(null, {response: 'success', frienddata: createdFriend});
    });
  });

  // this.add('role:friend,cmd:addAsFriend',function(msg,respond){
  //   return Friend.create(msg, function(err, createdFriend) {
  //     if(err) { return respond(err); }
  //     return respond(null, {response: 'success',frienddata:createdFriend});
  //   });
  // });


};
