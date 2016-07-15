var seneca = require('seneca');

var chatroomMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

chatroomMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});

chatroomMicroservice.use('mesh', {auto:true, pin: 'role:chat,cmd:*'});
