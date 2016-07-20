var controller = {};

var context = require('../../context');
var mesh = context.mesh;


controller.addAsFriend = function(req, res) {
  const friendsData = req.body;
  // console.log("req.body in controller================",req.body);
  // console.log('===== friendsData in controller =====: ', friendsData);
  mesh.act('role:friend,cmd:addAsFriend', friendsData, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { console.log('HERE2: ', response); return res.status(404).send(); }
    return res.status(200).json(response.frienddata);
  });
};

exports = module.exports = controller;
