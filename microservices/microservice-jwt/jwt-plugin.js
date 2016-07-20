var jwt = require('jsonwebtoken');
var _ = require('lodash');

exports = module.exports = function(options) {
  var secret = options.secret;

  this.add('role:jwt,cmd:generate', function(msg, respond) {
    this.act('role:authentication,cmd:authenticate', msg, function(err, response) {
      if(err) { return respond(err); }
      if(!response.hasOwnProperty('response') || response.response !== 'success') { return respond(null, {response: 'fail'}); }

      return jwt.sign({}, secret, { subject: msg.username }, function(err, token) {
        if(err) { return respond(err); }
        return respond(null, {token, response: 'success'});


      });

     });

});


  this.add('role:jwt,cmd:generateGoogleToken', function(msg, respond) {
      console.log("Inside generateGoogleToken the msg is,==========",msg);
      console.log("Inside generateGoogleToken the msg is,==========",msg.data.user);
      return jwt.sign({}, secret, { subject: msg.data.user }, function(err, token) {
        // if(err) { return respond(err); }
        // var userObj = {
        //   username: msg.data.user,
        //   useravatar :msg.data.useravatar,
        //   name : msg.data.name,
        //   age : null,
        //   country : 'NA',
        //   totalGames : 0,
        //   liketopics: '',
        //   following: 0,
        //   followers: 0,
        //   category: 'Beginner'
        // };
        // this.act('role:profile,cmd:create',userObj,function(err,response){
        //     if(err) { return respond(err); }
        //     return respond(null, {token, response: 'success'});
        // });
            return respond(null, {token, response: 'success'});
      });

  });

  this.add('role:jwt,cmd:verify', function(msg, respond) {
    var options = {
      clockTolerance: 30
    };

    return jwt.verify(msg.token, secret, _.merge(options,msg.options), function(err, claims) {
      if(err || !claims) { return respond(null, {response: 'fail'}); }
      return respond(null, {response: 'success', claims});
    });
  });


  this.add('role:jwt,cmd:createAuthToken', function(msg, respond) {
    return jwt.sign({key:msg.key,secret:msg.secret,userId:msg.userId},secret,{subject:msg.username },function(err, token) {
        if(err) { return respond(err); }
        return respond(null, {token, response: 'success'});
      });
  });

  this.add('role:jwt,cmd:verifyAuthToken', function(msg,respond) {
    var options = {
      clockTolerance: 30
    };
    console.log("======verification request=====");
    return jwt.verify(msg.token,secret, _.merge(options,msg.options), function(err,claims) {
      if(err || !claims) { return respond(err);
       console.log("failed to verify");
      }
      return respond(null, {response: 'success',claims:claims});
    });
  });

};
