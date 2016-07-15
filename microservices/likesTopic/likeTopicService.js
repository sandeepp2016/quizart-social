var seneca = require('seneca')();

seneca.use('mongo-store',{
  name: process.env.MONGO_DB_NAME || "quizRT4",
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.PORT || 27017
})
	.use('entity')
	.use('./likesTopicPlugin')
	.use('mesh',{auto:true,pin:'role:topic,action:like'});
  //
  // var test = {
  //   id:"1Basketball Players",
  //   incre:false
  // }
  // seneca.act('role:topic,action:like',{data:test},console.log);
