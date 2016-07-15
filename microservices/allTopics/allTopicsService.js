
var seneca = require('seneca')();

  seneca
  .use('entity')
  .use('mongo-store',{
    name: process.env.MONGO_DB_NAME || "quizRT4",
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.PORT || 27017
  })
  .use('./allTopicsPlugin')
  // .act('role:allTopics,action:retrive',function(err,result){
  //   if(err) return console.error(err)
  //   console.log(result)
  // })
  .use('mesh', { auto:true, pin:'role:allTopics' })
