var seneca = require('seneca');

var analyticsMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

analyticsMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
analyticsMicroservice.use('mesh', {auto:true, pin: 'role:analytics,cmd:*'});
