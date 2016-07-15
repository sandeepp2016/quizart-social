var seneca = require('seneca')();

  seneca
  .use('entity')
  .use('mongo-store',{
    name: process.env.MONGO_DB_NAME || "quizRT4",
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.PORT || 27017
  })
  .use('./myFavPlugin')
  // .act('role:myFav,action:retrive',{user:"dp@dp.com"},function(err,result){
  //   if(err) return console.error(err)
  //   console.log(result)
  //   console.log(">>>>>>>>>>"+result.like);
  // })
  .use('mesh', { auto:true, pin:'role:myFav,action:retrive' })
