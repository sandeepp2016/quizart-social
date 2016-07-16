var controller = {};

var context = require('../../context');
var mesh = context.mesh;


controller.create = function(req, res) {
    const newpost = req.body;
    console.log("============================req.body==================",req.body);
    console.log("======================newpost===============================",newpost);
    mesh.act('role:analytics,cmd:create',newpost,function(err, response) {
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
      if(response.response !== 'success') { return res.status(404).send(); }
      return res.status(201).json(response.entity);
  });
};

exports = module.exports = controller;
