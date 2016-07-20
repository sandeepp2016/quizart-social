var mongoose = require('mongoose');



 const connection = mongoose.createConnection("mongodb://localhost:27017/timeline-test");

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' );
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' );
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });
   //
   //
    const posts = connection.model('posts', require('./post.schema'));
  msg  =  {id:"12123",text:"hello",userId:"123234345"};
  posts.create(msg,function(err,newpost){
             if(err){
                   console.log(err);
             }
              else
              console.log(newpost);
   });
  //  this.add('role:timelineservice,cmd:post', function(msg, respond) {
   //
  //             return  posts.create(msg,function(err,newpost){
  //            if(err){
  //                  return respond(err);
  //            }
  //             else return respond(null,{response:'success'});
  //    });





//};
