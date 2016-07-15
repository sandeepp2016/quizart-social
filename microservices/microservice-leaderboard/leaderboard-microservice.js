var seneca = require('seneca');

var leaderboardMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

leaderboardMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'
});
leaderboardMicroservice.use('mesh', {auto:true, pin:'role:leaderboards,cmd:*'});
