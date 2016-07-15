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

   const userAnalytics = connection.model('', require('./userAnalytics.schema.js'));

   this.add('role:analytics,cmd:create,type:user', function(msg, respond) {
          console.log("msg.text===="+msg.text+"=====");
        return  userAnalytics.create(msg,function(err,newpost){
             if(err){
                      return respond(err);
                 }
              else return respond(null,{response:'success',Id:newpost._id});
     });

  });
};