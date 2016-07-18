var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.signup = function(req, res) {
  var data = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password
  };
  mesh.act('role:authentication,cmd:create', data, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response==='success'){
      var userObj = {
        username: data.username,
        useravatar :'',
        name : data.name,
        age : null,
        country : 'NA',
        totalGames : 0,
        liketopics: '',
        following: 0,
        followers: 0,
        category: 'Beginner'
      };
      mesh.act('role:profile,cmd:create',userObj,function(err,response){
          if(err) { return res.status(500).json(err); }
          if(response.response !== 'success') { return res.status(404).json({
            message : 'User Already Exists',
            success : false
          }); }
          res.json({success: true});
          // return respond(null, {token, response: 'success'});
      });
      // res.json({success: true});
    }
    else {
      res.json({
        message : 'User Already Exists',
        success : false
      })
    }

  });
};

exports = module.exports = controller;
