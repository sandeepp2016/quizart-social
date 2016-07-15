var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.getfriendslist = function(req, res) {
  var uid = req.param("uid");
  console.log("======user id passed to server from friendlist controller "+uid);
  mesh.act('role:chat,cmd:getFriendList', {uid:req.param("uid")}, function(err, response) {
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }
    console.log("==========Inside controller====== ",response.friends);
    return res.status(201).json({data:response.friends});
  });
};

// controller.getgroupslist = function(req, res) {
//   var uid = req.param("uid");
//   console.log("======user id passed to server to get groups "+uid);
//   mesh.act('role:chat,cmd:getGroupList', {uid:req.param("uid")}, function(err, response) {
//     if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
//     if(response.response !== 'success') { return res.status(403).send(); }
//     console.log("==========Inside controller to retrieve groups====== ",response.groups);
//     return res.status(201).json({data:response.groups});
//   });
// };
//
// controller.addgroup = function(req, res) {
//   // console.log("===Inside addgroup ",req);
//   console.log("===Inside addgroup body ",req.body);
//   // console.log("===Inside addgroup body ",req.body);
//
//   mesh.act('role:chat,cmd:creategroup', req.body, function(err, response) {
//     if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
//     if(response.response !== 'success') { return res.status(403).send(); }
//     console.log("==========Inside controller data to post into groups====== ",response.group);
//     var groupObj = {subject:response.group.topicid,relation:"Members are",object:req.body.members};
//     console.log("====Inside controller the groupobj to be updated in friends ",groupObj);
//     mesh.act('role:chat,cmd:createFriends',groupObj,
//     function(err,response1){
//       if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
//       if(response1.response !== 'success') { return res.status(403).send(); }
//       console.log("===Inside Controller Retrieved group details after updation in Friends",response1);
//       return res.status(201).json({friendsdata:response1.frienddata,groupdata:response.group});
//     })
//
//   });
// };


exports = module.exports = controller;
