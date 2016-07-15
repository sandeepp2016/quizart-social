var seneca = require('seneca');

var profileMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

profileMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
profileMicroservice.use('mesh', {auto:true, pin: 'role:profile,cmd:*'});
