var seneca = require('seneca');

var tournamentMicroservice = seneca();

var env = process.env.NODE_ENV || 'dev';

tournamentMicroservice.use('.', {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/quizRT4'
});
tournamentMicroservice.use('mesh', {auto:true, pin:'role:tournaments,cmd:*'});
