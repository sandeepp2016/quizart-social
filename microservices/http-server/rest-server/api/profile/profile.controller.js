var controller = {};

var context = require('../../context');
var mesh = context.mesh;

controller.getProfile = function(req, res) {
  console.log("username in controller",req.param("username"));
  const ProfileData = {
    username :req.param("username")
  };
  console.log("ProfileData in getProfile controller:",ProfileData);
  mesh.act('role:profile,cmd:getProfile',ProfileData,function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(404).send(); }
    console.log("response.profile inside controller====",response.profile);
    return res.status(201).json(response.profile);
  });
};

controller.editProfile = function(req, res) {
  const ProfileData = req.body;
  console.log("username in controller================",ProfileData.username);
  console.log('===== Editing profile in controller =====: ', ProfileData);
  mesh.act('role:profile,cmd:editProfile', ProfileData, function(err, response) {
    if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { console.log('HERE2: ', response); return res.status(404).send(); }
    return res.status(200).json(response.entity);
  });
};

// controller.editProfile = function(req, res) {
//   console.log("data in controller",req.body);
//   const ProfileData = req.body;
//   console.log("ProfileData in editProfile controller:",ProfileData);
//   mesh.act('role:profile,cmd:editProfile',ProfileData,function(err, response) {
//     if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
//     if(response.response !== 'success') { return res.status(404).send(); }
//     console.log("response.profile inside controller====",response.profile);
//     return res.status(201).json(response.profile);
//   });
// };

exports = module.exports = controller;
