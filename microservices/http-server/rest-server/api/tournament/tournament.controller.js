var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.create = function(req, res) {
  mesh.act('role:tournaments,cmd:create',req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(201).json(response.entity);
  });
};

controller.retrieveAll = function(req, res) {
  mesh.act('role:tournaments,cmd:retrieveAll', function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(201).json(response.entity);
  });
};

controller.registerPlayer = function(req, res) {
  mesh.act('role:tournaments,cmd:registerPlayerFirstLevel',req.body, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(201).json(response.entity);
  });
};

exports = module.exports = controller;
