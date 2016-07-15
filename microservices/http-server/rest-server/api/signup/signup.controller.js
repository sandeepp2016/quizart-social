var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.signup = function(req, res) {
  var data = {
    username : req.body.username,
    name : req.body.name,
    password : req.body.password
  }
  mesh.act('role:authentication,cmd:create', data, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response==='success'){
      res.json({
        success: true
      })
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
