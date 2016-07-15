var mongoose = require('mongoose')


exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);

  connection.on('connected', function() {
    console.log('Mongoose connection open to: ' + options.mongoUrl);
  });

  connection.on('error', function() {
    console.error('Mongoose connection error: ' + options.mongoUrl);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose connection disconnected due to app SIGINT.');
    });
  });

  const Friend = connection.model('Friend', require('./friends.schema'));
  const Groups = connection.model('Groups', require('./groups.schema'));
  const UserProfile = connection.model('UserProfile', require('./user.schema'));


  this.add('role:chat,cmd:createFriends',function(msg,respond){
    console.log("=====Inside Chatroom Plugin, data to create friends collection is===== ",msg)
    ;
    return Friend.create(msg, function(err, createdFriend) {
      if(err) { return respond(err); }
      return respond(null, {response: 'success',frienddata:createdFriend});
    });
  });

  this.add('role:chat,cmd:getFriendList', function(msg, respond) {
    console.log("=============Inside plugin getfriend list msg==== ",msg);
    console.log("=============Inside plugin getfriend list msg uid==== ",msg.uid);

    return Friend.aggregate([
          { $match:
            {relation:"friends",subject:msg.uid}
          },
          {$group:
            {_id:"$subject"}
          },
          {$unwind:"$_id"},
          {$group:
            {_id:null,friends:{$addToSet:"$_id"}}
          },
          {$project:
            {friends:1}
          }
        ],function(err,retrievedFriendsList){
          if(err) {return respond(err); }
          // console.log("Inside Plugin retrievedFriendsList:",retrievedFriendsList);
          // console.log("Inside Plugin retrievedFriendsList:",retrievedFriendsList[0].friends);
          // var x= retrievedFriendsList[0].friends;
            return UserProfile.aggregate([
              // {$limit:2},
              { $match:
                {username:{$in:retrievedFriendsList[0].friends}}
              }
            ],function(err,friendsData){
                if(err) {return respond(err); }
                return respond(null, {response:'success',friends:friendsData})
            })
        })
      });

  this.add('role:chat,cmd:getGroupList',function(msg,respond){
      return Friend.aggregate([
          { $match:
            {relation:"members are",object:msg.uid}
          },
          {$unwind:"$subject"},
          { $group:
            {_id:null,groups:{$addToSet:"$subject"}}
          },
          { $project:
            {groups:1}
          }
      ],function(err,retrievedGroupsList){
        if(err) {return respond(err);}
        // console.log("Inside Plugin retrievedGroupsList:",retrievedGroupsList[0].groups);
            return Groups.aggregate([
                { $match:
                  {topicid:{$in:retrievedGroupsList[0].groups}}
                }
            ],function(err,groupData){
                if(err) {return respond(err); }
                return respond(null,{response:'success',groups:groupData})
            });

        // return respond(null,{response:'success',groups:retrievedGroupsList})
      });
  });

  this.add('role:chat,cmd:getGroupMembers',function(msg,respond){
    return Friend.aggregate([
      { $match:
          {relation:"members are",subject:msg.gid}
      },
      { $group:
          {_id: "$object"}
      },
      { $unwind:"$_id"},
      { $group:
        {_id:null,friends:{$addToSet:"$_id"}}
      },
      { $project:
        {friends:1}
      }
    ],function(err,retrievedGroupsMembers){
        if(err) {return respond(err);}
        return UserProfile.aggregate([
          // {$limit:2},
          { $match:
            {username:{$in:retrievedGroupsMembers[0].friends}}
          }
        ],function(err,getGroupMembersData){
            if(err) {return respond(err); }
            return respond(null, {response:'success',groupmembers:getGroupMembersData})
        })
        // return respond(null,{response:'success',groupmembers:retrievedGroupsMembers})
    });
  });
  // db.friends.aggregate([{ $match:{relation:"Members are",subject:"1160"}},{$group:{_id:"$object"}},{$unwind:"$_id"},
  // {$group:{_id:null,friends:{$addToSet:"$_id"}}},{$project:{friends:1}}])


  this.add('role:chat,cmd:leavegroup',function(msg,respond){
      return Friend.update(
        {subject:msg.gid},//give group id i.e.,topic id of group
        {$pull:{object:msg.userid}},function(err,updatedGroup){
          if(err) {return respond(err); }
          return respond(null,{response:'success',updatedgroup:updatedGroup})
        });
  });

  this.add('role:chat,cmd:creategroup',function(msg,respond){
    return Groups.create(msg,function(err,createdGroup){
      if(err) {return respond(err); }
      // if(createdGroup.length > 0)
      //   console.log("inside plugin:",msg.members);
      // console.log("Inside Plugin:",createdGroup._id);
      return respond(null,{response:'success',group:createdGroup});
    });
  });


  this.add('role:chat,cmd:joinprivateroom',function(msg,respond){
    return Friend.find(
      {subject:{$all:msg.ids},"relation":"friends"},function(err,retrievedRoomId){
        if(err) {return respond(err); }
        return respond(null,{response:'success',roomId:retrievedRoomId})
    });
    // db.friends.find({"subject":{$all:["Sandeep","Vigneshwar"]},"relation":"Friends"})
  });


  this.add('role:chat,cmd:joingroup',function(msg,respond){
    return Groups.find(
      {subject:{$all:msg.groupname},"relation":"friends"},function(err,retrievedRoomId){
        if(err) {return respond(err); }
        return respond(null,{response:'success',roomId:retrievedRoomId})
    });
    // db.friends.find({"subject":{$all:["Sandeep","Vigneshwar"]},"relation":"Friends"})
  });
};
