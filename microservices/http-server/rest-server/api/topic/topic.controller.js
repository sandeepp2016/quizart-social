var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.getTopic = function(req, res) {
  // console.log("topic Id in controller",req.param("id"));
  const TopicData = {
    id :req.param("id")
  };
  console.log("TopicData in getTopic controller:",TopicData);
  mesh.act('role:topic,cmd:getTopic',TopicData,function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    return res.status(201).json(response.topic);
  });
};


exports = module.exports = controller;
