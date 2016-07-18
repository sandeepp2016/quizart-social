var mongoose = require('mongoose');
var jsonfile = require('jsonfile');
var fs = require('fs');
var mkdirp = require('mkdirp');
var MsgObj = {} ;


exports = module.exports = function(options) {
  const connection = mongoose.createConnection(options.mongoUrl);
  var MsgObj = {};

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
  // const ChatHistory = connection.model('ChatHistory', require('./chathistory.schema'));


  this.add('role:chat,cmd:createFriends',function(msg,respond){
    console.log("=====Inside Chatroom Plugin, data to create friends collection is===== ",msg);
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
    });
  });


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
      return respond(null,{response:'success',group:createdGroup});
    });
  });


  this.add('role:chat,cmd:joinprivateroom',function(msg,respond){
    console.log("Inside chatroom joinprivate plugin====msg is",msg.ids);
    return Friend.find(
      {subject:{$all:msg.ids},"relation":"friends"},function(err,retrievedRoomId){
        if(err) {return respond(err); }
        return respond(null,{response:'success',roomId:retrievedRoomId})
    });
  });

  // this.add('role:chat,cmd:savehistory',function(msg,respond){
  //   console.log("Inside Chatroom plugin to save history");
  //   console.log("Chat Msg sent from client",msg.chathistory);
  //   var file = './jsonfiles/'+msg.chathistory.topicid+'.json';
    // fs.mkdir('./jsonfiles/'+msg.chathistory.topicid,function(err,result){
    //   if(err){
    //       if(err.code === "EEXIST"){
    //         console.log("History already Exist");
    //         fs.readdir('./jsonfiles/'+msg.chathistory.topicid,function(err,files){
    //             console.log("Inside Read File directory, retrieved number of files are,==",files);
    //             console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
    //             var fileNumber = files.length;
    //
    //         });
    //       }
    //     console.log("Error inside mkdir",err.code); return respond(err);}
    //
    // })
  //   // fs.readdir('./jsonfiles/'+msg.chathistory.topicid,function(err,files){
  //   //     console.log("Inside Read File directory, retrieved number of files are,==",files);
  //   // });
  //   fs.readFile(file,'utf-8',function cb(err,data){
  //     if(err){return respond(err);}
  //     obj = JSON.parse(data);
  //     console.log("inside Save History, length of array in file is==",obj.length);
  //     console.log("Inside Save History, the parsed file data is obj====",obj);
  //     obj.unshift(msg.chathistory);
  //     stringifyObj = JSON.stringify(obj);
  //     console.log("Data to be pushed into json file after concating is ==",stringifyObj);
      // fs.writeFile(file,stringifyObj,'utf-8',function cb(err,data){
      //     return respond (null,{response:'success',result:data});
      // });
  //   });
  //   //
  //   // jsonfile.writeFile(file,msg.chathistory,function(err,result){
  //   //   if(err) {return respond(err); }
  //   //   return respond(null,{response:'success',result:result});
  //   // });
  // });

  this.add('role:chat,cmd:savehistory',function(msg,respond){
    console.log("Inside the save history plugin");
    console.log("Inside Sve history plugin, msg is ===",msg.ChatMsg.topicid[0]);
    console.log("Inside Sve history plugin, msg is ===",typeof(msg.ChatMsg.topicid[0]));
    console.log("Inside Sve history plugin, msg is ===",msg.ChatMsg.message);
    console.log("Inside Sve history plugin, msg is ===",msg.ChatMsg.sentby);
    console.log("Inside Sve history plugin, msg is ===",MsgObj);
    var topicid = 3210;
    var sentby = msg.ChatMsg.sentby;
    var message = msg.ChatMsg.message;
    console.log("topicid",topicid);
    console.log("message",message);
    console.log("sentby",sentby);
    if(!MsgObj[topicid]){
            var msgFromClient = {
              message: message,
              sentby: sentby
            }
            console.log("Msg from client is===",msgFromClient);
            console.log("topic id to put into obj",topicid);
            MsgObj[topicid] = [msgFromClient];
            console.log("Msgobj updated is ",MsgObj);
            return respond(null,{response:'success',result:MsgObj});
    }
    else{
      console.log("inside else loop");
          var arr = MsgObj[topicid];
          console.log("Length of array for the topic id"+topicid+"is"+arr.length);
          var msgFromClient = {
            message: message,
            sentby: sentby
          }
          if(arr.length>=20){
            fs.mkdir('/data/chathistory/'+topicid,function(err,result){

              console.log("Inside loop for creating directory");
              if(err){
                console.log("Inside loop for creating directory and ther is an error logging the error",err);
                console.log("Inside loop for creating directory and ther is an error");
                  if(err.code === "EEXIST"){
                    console.log("History already Exist");
                    fs.readdir('/data/chathistory/'+topicid,function(err,files){
                        console.log("Inside Read File directory, retrieved number of files are,==",files);
                        console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
                        var fileNumber = files.length;
                        var file = '/data/chathistory/'+topicid+'/'+topicid+'-'+(fileNumber+1)+'.json';
                        console.log("Inside loop for creating directory the new file to be written in old folder is ",file);
                        fs.writeFile(file,JSON.stringify(MsgObj),'utf-8',function cb(err,data){
                            if(err){return respond(err);}
                            MsgObj[topicid] = [];
                            MsgObj[topicid] = [msgFromClient];
                            return respond (null,{response:'success',result:MsgObj});
                        });
                    });
                  }
                // console.log("Error inside mkdir",err.code); return respond(err);
              }
              else{
                console.log("Inside loop for creating directory and ther is no folder existing ,so folder created");
                var file = '/data/chathistory/'+topicid+'/'+topicid+'-1.json';
                console.log("Inside loop for creating directory the new file to be written in new folder is ",file);
                fs.writeFile(file,JSON.stringify(MsgObj),'utf-8',function cb(err,data){
                    if(err){return respond(err);}
                    MsgObj[topicid] = [];
                    MsgObj[topicid] = [msgFromClient];
                    return respond (null,{response:'success',result:MsgObj});
                });
              }
            });
          }
          else{
            arr.unshift(msgFromClient);
            MsgObj[topicid] = arr;
            console.log("inside save and update history, the MsgObj now is===",MsgObj);
            return respond(null,{response:'success',result:MsgObj});
          }
        }
  });

  this.add('role:chat,cmd:retrievechathistory',function(msg,respond){
    console.log("Inside Chatroom plugin , to retrieve history",msg.fileid);
    // var file ='./jsonfiles/'+msg.fileid;
    fs.readdir('./jsonfiles/'+msg.fileid,function(err,files){
      if(err){return respond(err);}
        console.log("Inside Read File directory, retrieved number of files are,==",files);
        console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
        var fileNumber = files.length;
        var fileToRead = '/data/chathistory/'+msg.fileid+'/'+msg.fileid+'-'+fileNumber+'.json';
        console.log("FileToRead is ",fileToRead);
        fs.readFile(fileToRead,'utf-8',function cb(err,data){
          if(err){return respond(err);}
          obj = JSON.parse(data);
          return respond (null,{response:'success',retrievedHistory:obj});
        });
      });
  });


  // this.add('role:chat,cmd:joingrouproom',function(msg,respond){
  //   return Groups.find(
  //     {subject:{$all:msg.groupname},"relation":"friends"},function(err,retrievedRoomId){
  //       if(err) {return respond(err); }
  //       return respond(null,{response:'success',roomId:retrievedRoomId})
  //   });
  //   // db.friends.find({"subject":{$all:["Sandeep","Vigneshwar"]},"relation":"Friends"})
  // });
};
