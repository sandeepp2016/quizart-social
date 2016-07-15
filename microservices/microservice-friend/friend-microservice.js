var seneca = require('seneca');

var friendMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

friendMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
friendMicroservice.use('mesh', {auto:true, pin: 'role:friend,cmd:*'});
