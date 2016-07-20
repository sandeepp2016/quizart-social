var mongoose = require('mongoose');

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

   const TwitterAuth = connection.model('TwitterAuth', require('./twitter.auth.schema'));

   this.add('role:timelineservice,cmd:createAuth', function(msg, respond) {
          console.log("data recieved====",msg);
        return TwitterAuth.create(msg,function(err,newAuth){
             if(err){
                      return respond(err);
                 }
              else return respond(null,{response:'success',newAuth:newAuth});
     });

  });

  this.add('role:timelineservice,cmd:dangerouslyDelete',function(err,respond){
   return TwitterAuth.remove({},function(err){
       if(err){return respond(err);}
       return respond(null,{response:"success"});
      });
    })

  this.add('role:timelineservice,cmd:getTwitterAuth',function(msg,respond){

     console.log("======getTwitterAuth========");
      return TwitterAuth.find({username:msg.username},function(err,auth){
        if(err){return respond(err);}
        return respond(null,{response:'success',TwitterAuth:auth})
      });
   });

  //  this.add('role:timelineservice,cmd:removeAuth',function(msg,respond){
  //      return TwitterAuth.remove({username:msg.username},function(err,deleted){
  //        if(err){return respond(err)}
   //
  //        return respond(null,{response:'success',deletedAuth:deleted})
  //      })
  //   });

};
