var seneca = require('seneca');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var request = require('request');


var secret = process.env.AUTH_SECRET || "the matrix";
var googlecredentials = require('./secrets/googlecredentials');
var oauth2Client = new OAuth2(googlecredentials.CLIENT_ID, googlecredentials.CLIENT_SECRET, googlecredentials.REDIRECT_URL);
var redirectHost = process.env.REDIRECT_HOST || "localhost";
var port = process.env.PORT || '8001';
var redirectPort = process.env.REDIRECT_PORT || port;

var name = process.env.NAME || "default";


var mesh = seneca();
mesh.use('mesh',{auto:true});

var context = require('./context');
context.mesh = mesh;
context.authorizeMiddleware = function(req, res, next) {
  mesh.act('role:jwt,cmd:verify', {token: req.get('JWT')}, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response !== 'success') { return res.status(404).send(); }
    req.claims = response.claims;
    next();
  });
};


var env = process.env.NODE_ENV || 'dev';

console.log('env is: ' + env);

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    console.log("inside server checking env",env);
    next();
  });
};

app.use(require('body-parser').json());
app.set('secret',secret);
app.use('/api/v1', require('./router'));

var chat = io.of('/chat');



app.post('/api/authenticate/google',function(req,res,next){
  console.log("Inside Express, inside google login call=======");

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    googlecredentials.SCOPE[0],
    googlecredentials.SCOPE[1]
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes,
    approval_prompt: "force" // If you only need one scope you can pass it as string
  });
  // res.redirect('http://'+redirectHost+':'+redirectPort+'/api/auth/success/google');
  console.log("Inside express, redirection url================",url);
  res.send({ redirect: url });
  // next();
});

app.get('/api/auth/success/google',function(req,res){
  console.log("Inside google page===========");
  var code = req.query.code;
  console.log("Inside Express, code to get Token is=============",code);
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    console.log("Inside Express , after getting token=======",tokens);
    console.log("Inside Express , after getting token=======",JSON.stringify(tokens));
    if(!err) {
      oauth2Client.setCredentials(tokens);
    }
    if(err){
      console.log(err);
    }

    var access_token = tokens['access_token'];
    var user_profile = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+access_token;
      request({
        url: user_profile,
        json: true
      }, function (error, response, body) {
        if (!error) {
          console.log("Inside the Express after getting the user profile the body is ======",body);
          var tokendata = {
            user : body.email,
            name : body.given_name,
            useravatar : body.picture
          }
          console.log("Inside Express, the user profile token data========,",tokendata);
          mesh.act('role:jwt,cmd:generateGoogleToken',{data:tokendata},function(err,tokenresponse){
            var data = {
              name:body.email,
            }
            // mesh.act('role:user,action:get',{data:data.name},function(err,respond){
            //   if(err) { return res.status(500).json(err); }
            //     if(respond == null){
            //       mesh.act('role:user,action:add', {data:data}, function(err,saved_user){
            //         if(err) { return res.status(500).json(err); }
            //       })
            //     }
            // })
            // localStorage.token = tokenresponse.token;
            console.log("Inside Express , token after acting on google token us is ======",tokenresponse.token);
            console.log("Inside Express , token after acting on google token us is stringified======",JSON.stringify(tokenresponse.token));
            // window.localStorage['token'] = tokenresponse.token;
            // res.cookie('username',data.name);
            // res.status(201).json({token: tokenresponse.token})
            // res.setHeader("token",tokenresponse.token);
            // res.setHeader("token",tokenresponse.token).redirect('http://192.168.99.101:8001/#/');
            // res.send({ token: tokenresponse.token });
            res.redirect('http://192.168.99.100:8001/#/authsuccess/'+tokenresponse.token);
            // res
          })
      } else {
        res.redirect('/login');
          console.log(error);
      }
    })
  });

});


chat.on('connection', function(socket) {
  console.log("Inside socket.io");
  var chatMiddlewareMicroservice = require('seneca')();
  var flag = false;
  var count =0;
  socket.on('create_room', function(userids){
    // chatmiddleware.use('redis-transport');

    count++;
    console.log("=====Inside App.js Socket initaited , ",count);
      var channelId = false;
      mesh.act('role:chat,cmd:joinprivateroom',{ids:userids}, function(err, response){
          if(err) { console.error('===== ERR: ', err, ' =====');  }

          console.log("Inside App.js getting room ID===",response.roomId[0].object);
          channelId = response.roomId[0].object ;
      }).ready(function(){
      chatMiddlewareMicroservice.use('chatmiddlewareplugin',{chatroomId:channelId,socket:socket});
    });
  });

  socket.on('chat_message', function(msgToSend){
    console.log("Inside App.js meessage from client via socket====",msgToSend);

      console.log("Inside App.js meessage from client via socket inside flag condition====",msgToSend);
      chatMiddlewareMicroservice.act('role:chat,cmd:sendMsg', {msg: msgToSend}, function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' =====');  }
          if(response.response === 'success')
          console.log("====Inside express after acting the response is msg ,===",response.message);
        });
      });

    socket.on('disconnect',function(){
      chatMiddlewareMicroservice.act('role:chat,cmd:unsubscribe', {msg: 'unsubscribe'}, function(err, response) {
          if(err) { console.error('===== ERR: ', err, ' =====');  }
          if(response.response === 'success')
          console.log("====Inside express unsubscribed from redis=== ",response.message);
        });
      console.log("=====Inside Express Socket.disconnected and redis unsubscribed=====");

    });
});

app.get('/topics',function(req,res) {
  console.log('form express-alltopics');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mesh.act('role:allTopics,action:retrive',function(err,result){
    if (err) return console.error(err)
  console.log('-----------------'+result+'------------------------')
  res.send(result)
  })
  console.log('send');
});


app.get('/topics/myfav',function(req,res) {
 mesh.act('role:myFav,action:retrive',{user:req.params.uid},function(err,result){
 if (err) return console.error(err)
console.log('------------yahi to hai result-----'+result+'------------------------')
res.send(result);
 })
 console.log('agrt dfglca;lkg');
 })

 app.get('/tournamentSection',function(req,res) {
   console.log('form express-tournamentSection');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:randTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

 app.get('/tournaments',function(req,res) {
   console.log('form express-alltopics');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:allTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

app.post('/api/check',function(req,res){
 console.log('-------------- abc from express floow---------------');
 console.log(req.body.incre+'   0----------------------');
 console.log(req.body.id+'    ---------------------');
 var test = {
   id:req.body.id,
   incre:req.body.incre,
   username:req.body.uName
 }

 var username = req.body.uName;

 mesh.act('role:topic,action:like',{data:test},function(err,result){

   if(err) console.log(err+'---------------------------------------done liked---------');

   console.log(result+'yaha thak hai>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
   if(!req.body.incre) {
     mesh.act('role:topic,action:delete',{data:test},function(err,result2){

       if(err) console.log(err+' ========================');

       res.send(result)
     })
   }
     //  res.send(result);
 })
});


app.use(function(req, res) {
  return res.status(404).send();
});

//---------------------------------------
var middleWareCount =0;



io.on('connection',function(socket){
  middleWareCount++;
  console.log('\n =====Middleware count is: '+middleWareCount+'\n');
  var playerMiddleWareService =  require('seneca')();
   socket.on('playGame',function(msg){
     console.log(' \n\n Received play game message  \n\n');
     playerMiddleWareService.use('redis-transport');
    // console.log('\n Setting up middleware for user \n');
    console.log('\n======Initializing plugin for  : '+(msg.username)+'\n');
    playerMiddleWareService.use('./gameplayMiddlewarePlugin', {
      username:msg.username,
      tournamentId:msg.tournamentId,
      socket:socket
    });
  });

  socket.on('disconnect',function(){
    console.log('\n======Closing service=====\n');
    playerMiddleWareService.close();
  })

 // var serverMessages = ["North of the wall","Casterly Rock","Westeros","Pentos","Bravos","Winterfell","Mereen"]
 // var randomSelection = Math.floor(Math.random()*7)


  socket.emit('serverId',"This question is coming from "+name);

  socket.on('myAnswer',function(socketObj){
    console.log('\n==========Answer received by server is: '+socketObj.answer+'\n');
     playerMiddleWareService.act('role:user,action:answer',{answer:socketObj.answer},function(err,response){

     })
  });
})

//----------------------------

exports = module.exports = server;
