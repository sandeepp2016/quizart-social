var seneca = require('seneca');

var timelinemicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

timelinemicroservice.use('./timeline-plugin', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplate-'+env
});
timelinemicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});

// timelinemicroservice.use('./timeline.tournament-plugin', {
//   mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/boilerplat-'+env
// });
// timelinemicroservice.use('mesh', {auto:true, pin:'role:timelineservice,cmd:*'});
