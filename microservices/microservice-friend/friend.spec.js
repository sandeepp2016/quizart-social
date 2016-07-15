  var should = require('should');
  var mongoose = require('mongoose')
  var seneca = require('seneca');
  var ObjectId = require('mongoose').Types.ObjectId;
  const baseMicroservice = seneca();
  const friendMicroservice = seneca();
  const consumerMicroservice = seneca();


  const friends ={
    subject: ["Vigneshwar","Sandeep"],
    relation:"Friends",
    object:Math.ceil(Math.random()*1231)
  };

  // mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

  describe('Setup', function() {
    it('Setup Mesh Base', function(done) {
      baseMicroservice.use('mesh', {base:true});
      baseMicroservice.ready(done);
    });

    it('Setup Friend Microservice', function(done) {
      this.timeout(5000);
      friendMicroservice.use('.', {
        mongoUrl: 'mongodb://localhost:27017/chatroom-test'
      });

      friendMicroservice.use('mesh', {auto:true, pin: 'role:chat,cmd:*'});

      friendMicroservice.ready(done);
    });

    it('Setup Consumer Microservice', function(done) {
      consumerMicroservice.use('mesh');
      consumerMicroservice.ready(done);
    });
  });


  describe('Create Friends', function() {
    it('Create Friends', function(done) {
      consumerMicroservice.act('role:chat,cmd:createFriends', friends, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('success');
        console.log("Friends Created");
        console.log(response.frienddata);
        done();
      });
    });
  });


  // var groupData ={
  //     groupname:"QuizzRTSocial8",
  //     groupavatar:"http://lorempixel.com/100/100",
  //     topicid:Math.ceil(Math.random()*1231),
  //     members:["Vigneshwar","Sandeep","Preethi"]
  // };
  //
  // describe('Create Group', function() {
  //   it('Create Group', function(done) {
  //     this.timeout(5000);
  //     consumerMicroservice.act('role:chat,cmd:creategroup',groupData, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       // console.log("Retrieved group details Stringified",JSON.stringify(response));
  //       console.log("Retrieved group details",(response));
  //       // console.log("Retrieved group details",(response.group.topicid));
  //       var groupObj = {subject:response.group.topicid,relation:"Members are",object:groupData.members};
  //       consumerMicroservice.act('role:chat,cmd:createFriends',groupObj,
  //       function(err,response){
  //         if(err) { return done(err); }
  //         response.should.have.property('response');
  //         response.response.should.be.exactly('success');
  //         console.log("Retrieved group details after updation",response);
  //         done();
  //       })
  //       // done();
  //     });
  //   });
  // });
  //
  //
  // describe('Retrieve Friends', function() {
  //   it('Retrieve Friends', function(done) {
  //     this.timeout(5000);
  //     consumerMicroservice.act('role:chat,cmd:getFriendList', {uid:"Vigneshwar"}, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       console.log("Retrieved FriendsList",response);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Retrieve Groups', function() {
  //   it('Retrieve Groups', function(done) {
  //     this.timeout(5000);
  //     consumerMicroservice.act('role:chat,cmd:getGroupList', {uid: "Vigneshwar"}, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       console.log("Retrieved Group Object",response);
  //       // console.log("Retrieved Group ids",response.groups[0].groups);
  //       // console.log("Retrieved Groups ids",response.groups);
  //       done();
  //     });
  //   });
  // });
  //
  // var ids =  ["Vigneshwar","Sandeep"];
  // describe('Retrieve Private RoomID', function() {
  //   it('Retrieve Private RoomID', function(done) {
  //     this.timeout(5000);
  //     consumerMicroservice.act('role:chat,cmd:joinprivateroom',{ids:ids}, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       console.log("Retrieved RoomID",response.roomId);
  //       done();
  //     });
  //   });
  // });
  //
  // var data = {
  //   gid: '417',
  //   userid: 'Sandeep'
  // };
  // describe('Update Group', function() {
  //   it('Leave a Group', function(done) {
  //     this.timeout(5000);
  //     consumerMicroservice.act('role:chat,cmd:leavegroup',data, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       console.log("Retrieved Updated Group Data",response.updatedgroup);
  //       done();
  //     });
  //   });
  // });


  describe('Teardown', function() {
    it('consumerMicroservice', function(done) {
      consumerMicroservice.close(done);
    });

    it('friendMicroservice', function(done) {
      friendMicroservice.close(done);
    });

    it('baseMicroservice', function(done) {
      baseMicroservice.close(done);
    });
  });
