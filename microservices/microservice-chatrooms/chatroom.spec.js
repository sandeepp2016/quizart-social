  var should = require('should');
  var mongoose = require('mongoose')
  var seneca = require('seneca');
  var ObjectId = require('mongoose').Types.ObjectId;
  const baseMicroservice = seneca();
  const accountMicroservice = seneca();
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

    it('Setup Account Microservice', function(done) {
      this.timeout(5000);
      accountMicroservice.use('.', {
        mongoUrl: 'mongodb://localhost:27017/boilerplate-production'
      });

      accountMicroservice.use('mesh', {auto:true, pin: 'role:chat,cmd:*'});

      accountMicroservice.ready(done);
    });

    it('Setup Consumer Microservice', function(done) {
      consumerMicroservice.use('mesh');
      consumerMicroservice.ready(done);
    });
  });


  // describe('Create Friends', function() {
  //   it('Create Friends', function(done) {
  //     consumerMicroservice.act('role:chat,cmd:createFriends', friends, function(err, response) {
  //       if(err) { return done(err); }
  //       response.should.have.property('response');
  //       response.response.should.be.exactly('success');
  //       console.log("Friends Created");
  //       console.log(response.frienddata);
  //       done();
  //     });
  //   });
  // });


  var groupData ={
      groupname:"QuizRTSocialTest1",
      groupavatar:"http://lorempixel.com/100/100",
      topicid:Math.ceil(Math.random()*1231),
      members:["vigneshwar1@gmail.com","sandeep1@gmail.com","deepak1@gmail.com"]
  };

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
  //       var groupObj = {subject:response.group.topicid,relation:"members are",object:groupData.members};
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


  describe('Retrieve Friends', function() {
    it('Retrieve Friends', function(done) {
      this.timeout(5000);
      consumerMicroservice.act('role:chat,cmd:getFriendList', {uid:"vigneshwar1@gmail.com"}, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('success');
        console.log("Retrieved FriendsList",response);
        done();
      });
    });
  });

  describe('Retrieve Groups', function() {
    it('Retrieve Groups', function(done) {
      this.timeout(5000);
      consumerMicroservice.act('role:chat,cmd:getGroupList', {uid: "vigneshwar1@gmail.com"}, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('success');
        console.log("Retrieved Group Object",response);
        // console.log("Retrieved Group ids",response.groups[0].groups);
        // console.log("Retrieved Groups ids",response.groups);
        done();
      });
    });
  });


  describe('Retrieve Group Members', function() {
    it('Retrieve Group Members', function(done) {
      this.timeout(5000);
      consumerMicroservice.act('role:chat,cmd:getGroupMembers', {gid: "3458"}, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('success');
        console.log("Retrieved Group Members List ",response.groupmembers);
        // console.log("Retrieved Group ids",response.groups[0].groups);
        // console.log("Retrieved Groups ids",response.groups);
        done();
      });
    });
  });


  var ChatMsg =
    {
      topicid : ['2411'],
      message : 'Welcome Sandeep',
      sentby: 'Vigneshwar'
    };
    describe('Save History', function() {
      it('Save Chat History', function(done) {
        this.timeout(5000);
        consumerMicroservice.act('role:chat,cmd:savehistory', {ChatMsg:ChatMsg}, function(err, response) {
          if(err) { return done(err); }
          response.should.have.property('response');
          response.response.should.be.exactly('success');
          console.log("Retrieved result after saving history for first time is ",response.result);
          // console.log("Retrieved Group ids",response.groups[0].groups);
          // console.log("Retrieved Groups ids",response.groups);
          done();
        });
      });
    });


    var ChatMsg2 =
      {
        topicid : ['2411'],
        message : 'Welcome Preethi',
        sentby: 'Vigneshwar'
      };
      describe('Save History', function() {
        it('Save Chat History', function(done) {
          this.timeout(5000);
          consumerMicroservice.act('role:chat,cmd:savehistory', {ChatMsg:ChatMsg2}, function(err, response) {
            if(err) { return done(err); }
            response.should.have.property('response');
            response.response.should.be.exactly('success');
            console.log("Retrieved result after saving history for second time is ",response.result);
            // console.log("Retrieved Group ids",response.groups[0].groups);
            // console.log("Retrieved Groups ids",response.groups);
            done();
          });
        });
      });



      var ChatMsg1 =
        {
          topicid : ['2411'],
          message : 'Welcome Vigneshwar',
          sentby: 'Sandeep'
        };
    describe('Save and Update History', function() {
      it('Save and Update Chat History', function(done) {
        this.timeout(5000);
        consumerMicroservice.act('role:chat,cmd:savehistory', {ChatMsg:ChatMsg1}, function(err, response) {
          if(err) { return done(err); }
          response.should.have.property('response');
          response.response.should.be.exactly('success');
          console.log("Retrieved result after saving history for third time is ",response.result);
          // console.log("Retrieved Group ids",response.groups[0].groups);
          // console.log("Retrieved Groups ids",response.groups);
          done();
        });
      });
    });



    describe('Retrieve History', function() {
      it('Retrieve Chat History', function(done) {
        this.timeout(5000);
        consumerMicroservice.act('role:chat,cmd:retrievechathistory', {fileid: 2411}, function(err, response) {
          if(err) { return done(err); }
          response.should.have.property('response');
          response.response.should.be.exactly('success');
          console.log("Retrieved history from file is ",response.retrievedHistory);
          // console.log("Retrieved result is ",response.retrievedHistory[0]);
          // console.log("Retrieved Group ids",response.groups[0].groups);
          // console.log("Retrieved Groups ids",response.groups);
          done();
        });
      });
    });

  var ids =  ["vigneshwar1@gmail.com","sandeep1@gmail.com"];
  describe('Retrieve Private RoomID', function() {
    it('Retrieve Private RoomID', function(done) {
      this.timeout(5000);
      consumerMicroservice.act('role:chat,cmd:joinprivateroom',{ids:ids}, function(err, response) {
        if(err) { return done(err); }
        response.should.have.property('response');
        response.response.should.be.exactly('success');
        console.log("Retrieved RoomID",response.roomId[0].object);
        // console.log("Retrieved RoomID",response.roomId);
        done();
      });
    });
  });

  var data = {
    gid: '3457',
    userid: 'sandeep1@gmail.com'
  };
  // describe('Leave Group', function() {
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

    it('accountMicroservice', function(done) {
      accountMicroservice.close(done);
    });

    it('baseMicroservice', function(done) {
      baseMicroservice.close(done);
    });
  });




  // [
  //       { $match:
  //         {relation:"Friends",subject:msg.uid}
  //       },
  //       {$group:
  //         {_id:"$subject"}
  //       },
  //       {$unwind:"$_id"},
  //       { $redact:{
  //           $cond:{
  //             if:{$gt:[{$size:{$setIntersection:["$_id","Vigneshwar"]}},0]
  //             then:"$$DESCEND",
  //             else:"$$PRUNE"
  //           }
  //           }
  //       }
  //     },
  //       {$group:
  //         {_id:null,friends:{$addToSet:"$_id"}}
  //       },
  //       {$project:
  //         {friends:1}
  //       }
  //     ]


  //
  // {this.state.groupFlag===true?
  //   <div>
  //     <center style={{margin:19}}>
  //     <span style={{cursor:'pointer'}}>
  //       <FontIcon className="muidocs-icon-navigation-more_vert" onTouchTap={this.popoverOpen.bind(this)}/>
  //     </span>
  //     </center>
  //   </div>:null
  // }
