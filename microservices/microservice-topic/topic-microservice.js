var seneca = require('seneca');

var topicMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

topicMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'
});
topicMicroservice.use('mesh', {auto:true, pin: 'role:topic,cmd:*'});
