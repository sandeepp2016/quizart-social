var context = require('../../context');
var mesh = context.mesh;

var controller = {};



controller.leavegroup = function(req, res) {

  console.log("===Inside addgroup body ",req.body);

  mesh.act('role:chat,cmd:leavegroup', req.body, function(err, response) {
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }
    console.log("==========Inside controller,group data to post into friends collection====== ",response.updatedgroup);
    return res.status(201).json({updatedgroup:response.updatedgroup});
  });
};



exports = module.exports = controller;
