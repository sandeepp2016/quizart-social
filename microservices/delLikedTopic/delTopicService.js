var seneca = require('seneca')();

seneca.use('mongo-store',{
  name: process.env.MONGO_DB_NAME || "quizRT4",
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.PORT || 27017
})
	.use('entity')
  .use('delTopicPlugin')
	.use('mesh',{auto:true,pin:'role:topic'});

  // var test = {
  //   id:"Basketball-Players",
  //   incre:false
  // }
  // seneca.act('role:topic,action:delete',{data:test},console.log);
