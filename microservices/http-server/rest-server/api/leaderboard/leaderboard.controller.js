var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.create = function(req, res) {
  mesh.act('role:leaderboards,cmd:create',req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(201).json(response.entity);
  });
};

controller.retrieveLeaderboard = function(req, res) {
  mesh.act('role:leaderboards,cmd:retrieveById',{id:req.param("id")}, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(200).json(response.entity);
  });
};

exports = module.exports = controller;
