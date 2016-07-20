const redis=require('redis');
const fs = require('fs');
const subscriber=redis.createClient(6379,'172.23.238.253');
const publisher=redis.createClient(6379,'172.23.238.253');


var MsgObj = {};

console.log("Running...");

subscriber.subscribe('uuidgenerator2');

subscriber.on('message',function(channel,message){
      console.log("Subscribed to "+channel);
      var message1 = JSON.parse(message);
      console.log("Message from ,middleware plugin as it is after parsing is: ",message1);
      console.log("Command received is:",message1.message.command);
      console.log("Topic Id  received is:",message1.message.content);

      if(message1.message.command === 'generateUUID'){
        console.log("inside loop");
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        console.log("Generated UUID is ",uuid);
        var publishMsg ={
          content: uuid, command : 'generateUUID' , details : message1.details
        }
        publisher.publish(message1.message.content,JSON.stringify(publishMsg));
      }

      else if(message1.message.command === 'sendMessage'){
        var publishMsg = {
          content : message1.message.content,
          text : message1.message.text,
          sentBy : message1.message.sentBy,
          command : message1.message.command
        };
        var topicId = message1.message.content;
        console.log("Message to be published into the requested channel "+topicId+" is "+JSON.stringify(publishMsg));
        publisher.publish(message1.message.content,JSON.stringify(publishMsg));
          var updateMsgObj = {
              text : message1.message.text,
              sentBy : message1.message.sentBy
          };
              if(!MsgObj[topicId]){
                      console.log("Msg from client to be put into MsgObj is===",updateMsgObj);
                      console.log("topic id to put into obj",topicId);
                      console.log("MsgObj inside first time before updation is ",MsgObj);
                      MsgObj[topicId] = [updateMsgObj];
                      console.log("====Msgobj updated is ",MsgObj);
              }
              else{
                    console.log("inside else loop for saving message");
                    var arr = MsgObj[topicId];
                    console.log("=====Already existing array is:",arr);
                      if(arr.length>=4){
                        console.log("Inside If Loop");
                          fs.mkdir('/data/chathistory/'+topicId,function(err,result){
                          console.log("Inside loop for creating directory");
                            if(err){
                              console.log("Inside loop for creating directory and there is an error logging the error",err);
                                if(err.code === "EEXIST"){
                                  console.log("History folder already Exist");
                                  fs.readdir('/data/chathistory/'+topicId,function(err,files){
                                      console.log("Inside Read File directory, retrieved number of files are,==",files);
                                      console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
                                      var fileNumber = files.length;
                                      var file = '/data/chathistory/'+topicId+'/'+topicId+'-'+(fileNumber+1)+'.json';
                                      console.log("Inside loop for creating directory the new file to be written in old folder is ",file);
                                      console.log("Object to be written into file is",MsgObj[topicId]);
                                      fs.writeFile(file,JSON.stringify(MsgObj[topicId]),'utf-8',function cb(err,data){
                                          if(err){console.log("Error when writing the file and the error is ",err);}
                                          MsgObj[topicId] = [];
                                          MsgObj[topicId] = [updateMsgObj];
                                          console.log("The New Message Object updated is ",MsgObj);
                                          // MsgObj[topicId].count = MsgObj[topicId].count+1;
                                          // var temp = MsgObj[topicId].count ;
                                          // console.log("Before Reseting the MsgObj, the count is",MsgObj[topicId].count);
                                          // MsgObj[topicId] ={};
                                          // console.log("After Reseting the MsgObj, the count is",MsgObj[topicId].count);
                                          // MsgObj[topicId] = {count: temp};
                                          // MsgObj[topicId][MsgObj[topicId].count] = updateMsgObj;
                                          // console.log("After Writing into file, the update MsgObj specific to topicid is",MsgObj[topicId]);
                                          // console.log("After Writing into file, MsgObj is ",MsgObj);

                                      });
                                  });
                                }
                            }
                            else{
                              console.log("Inside loop for creating directory and ther is no folder existing ,so folder created");
                              var file = '/data/chathistory/'+topicId+'/'+topicId+'-1.json';
                              console.log("Inside loop for creating directory the new file to be written in new folder is ",file);
                              console.log("==========Object to be written into file,",MsgObj[topicId]);
                              fs.writeFile(file,JSON.stringify(MsgObj[topicId]),'utf-8',function cb(err,data){
                                  if(err){console.log("Error when writing the file and the error is ",err);}
                                  MsgObj[topicId] = [];
                                  MsgObj[topicId] = [updateMsgObj];
                                  // MsgObj[topicId].count = MsgObj[topicId].count+1;
                                  // var temp = MsgObj[topicId].count ;
                                  // console.log("Before Reseting the MsgObj, the count is",MsgObj[topicId].count);
                                  // MsgObj[topicId] ={};
                                  // console.log("After Reseting the MsgObj, the count is",MsgObj[topicId].count);
                                  // console.log("After Reseting the MsgObj, the count is",temp);
                                  // MsgObj[topicId] = {count: temp};
                                  // MsgObj[topicId][MsgObj[topicId].count] = updateMsgObj;
                                  // console.log("====After Writing into file, the update MsgObj specific to topicid is",MsgObj[topicId]);
                                  console.log("=====After Writing into file, MsgObj is ",MsgObj);
                              });
                            }
                          });
                      }
                      else{
                        console.log("Inside Else loop");
                        // MsgObj[topicId].count = MsgObj[topicId].count+1;
                        // MsgObj[topicId][MsgObj[topicId].count] = updateMsgObj;
                        arr.unshift(updateMsgObj);
                        MsgObj[topicId] = arr;
                        console.log("===after appending new message into MsgObj is ",MsgObj);
                        console.log("===after appending new message into MsgObj specific to topic is ",MsgObj[topicId]);
                      }
                }
              } //end of else if for send and save message


          // To Retrieve History, Send the TopicId
          else if(message1.message.command === 'retrieveHistory'){
            var topicId = message1.message.content;

            //If The TopicId is not there in the Im Memory Object,
            // Check for any files.

            if(!MsgObj[topicId]){
              console.log("There is no History present for the topic id",topicId);
              fs.readdir('/data/chathistory/'+topicId,function(err,files){

                //If there are no files, return history as null

                if(err){
                  console.log("There is no directory present but in MsgObj");
                  console.log("The current Msg Obj to be given back as history is",MsgObj[topicId]);
                  var history={
                         'command':'retrieveHistory',
                         'text':null,
                         'content':topicId
                  };
                  publisher.publish(topicId,JSON.stringify(history));
                }

                //If files are present , parse the file and send the history
                else{
                  console.log("Files present when there is no local Msg Obj are,",files);
                  var fileNumber = files.length;
                  var fileToRead = '/data/chathistory/'+topicId+'/'+topicId+'-'+fileNumber+'.json';
                  console.log("FileToRead is ",fileToRead);
                  fs.readFile(fileToRead,'utf-8',function cb(err,data){
                  if(err){console.log("error while reading the file to retrieve history");}
                  obj = JSON.parse(data);
                  //Parse the data in file, and save it in Obj
                  console.log("Parsed file data to retrive history:",obj);
                  var arr1 = obj;
                  //Convert into Array
                  console.log("The array after concating is arr1",arr1);
                  var history={
                         'command':'retrieveHistory',
                         'text':arr1,
                         'content':topicId
                     }
                  publisher.publish(topicId,JSON.stringify(history));
                });
              }
              });
            }

            //If Topic Id is present in the im memeory MsgObj

            else{
              fs.readdir('/data/chathistory/'+topicId,function(err,files){

                //Read the directory for any files

                if(err){
                //If the directory is not present,
                //Then send back the data which is in in memory MsgObj
                  console.log("The current Msg Obj to be given back as history is",MsgObj[topicId]);
                  var msgarr =[];
                  // for(key in MsgObj[topicId]){
                  //   console.log("Message inside loop is,",MsgObj[topicId][key]);
                  //   var temp = {};
                  //   temp[key] = MsgObj[topicId][key];
                  //   msgarr.push(temp);
                  // }
                  console.log("msgarr to be sentr is ",msgarr);
                  console.log("The current Msg Obj to be given back as history is Array",[MsgObj[topicId]]);
                  var history={
                         'command':'retrieveHistory',
                         'text':MsgObj[topicId],
                         'content':topicId
                  };
                  publisher.publish(topicId,JSON.stringify(history));
                }

                //If Directory is present, then read the files and Append the Local
                //in memory MsgObj and send the History back
                else{
                  console.log("Files present when there is a history in local obj are,",files);
                var fileNumber = files.length;
                var fileToRead = '/data/chathistory/'+topicId+'/'+topicId+'-'+fileNumber+'.json';
                console.log("FileToRead is when there is local obj",fileToRead);
                fs.readFile(fileToRead,'utf-8',function cb(err,data){
                  if(err){console.log("error while reading the file to retrieve history");}
                  obj = JSON.parse(data);
                  console.log("Parsed file data to retrive history when local obj is there:",obj);
                  console.log("Local MsgObj in memory is,",MsgObj[topicId]);
                  var arr = MsgObj[topicId];
                  console.log("The array before concating local in memory object",arr);
                  var arr1 = arr.concat(obj);
                  console.log("The array after concating is arr1",arr1);
                  var history={
                         'command':'retrieveHistory',
                         'text':arr1,
                         'content':topicId
                     }
                  publisher.publish(topicId,JSON.stringify(history));
                });
              }
              });

            }
          }
});



// console.log("Length of array for the topic id "+topicId+" is "+arr.length);
// var arrayLength = arr.length;
// if(arrayLength>=4){
//   fs.mkdir('/data/chathistory/'+topicId,function(err,result){
//   console.log("Inside loop for creating directory");
//     if(err){
//       console.log("Inside loop for creating directory and ther is an error logging the error",err);
//       console.log("Inside loop for creating directory and ther is an error");
//         if(err.code === "EEXIST"){
//           console.log("History folder already Exist");
//           fs.readdir('/data/chathistory/'+topicId,function(err,files){
//               console.log("Inside Read File directory, retrieved number of files are,==",files);
//               console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
//               var fileNumber = files.length;
//               var file = '/data/chathistory/'+topicId+'/'+topicId+'-'+(fileNumber+1)+'.json';
//               console.log("Inside loop for creating directory the new file to be written in old folder is ",file);
//               fs.writeFile(file,JSON.stringify(MsgObj),'utf-8',function cb(err,data){
//                   if(err){console.log("Error when writing the file and the error is ",err);}
//                   MsgObj[topicId] = [];
//                   MsgObj[topicId] = [updateMsgObj];
//               });
//           });
//         }
//     }
//     else{
//       console.log("Inside loop for creating directory and ther is no folder existing ,so folder created");
//       var file = '/data/chathistory/'+topicId+'/'+topicId+'-1.json';
//       console.log("Inside loop for creating directory the new file to be written in new folder is ",file);
//       fs.writeFile(file,JSON.stringify(MsgObj),'utf-8',function cb(err,data){
//           if(err){console.log("Error when writing the file and the error is ",err);}
//           MsgObj[topicId] = [];
//           MsgObj[topicId] = [updateMsgObj];
//           console.log("The New Message Object updated is ",MsgObj);
//       });
//     }
//   });
// }
//   else{
//     arr.unshift(updateMsgObj);
//     MsgObj[topicId] =arr;
//     console.log("inside save and update history, the MsgObj now is===",MsgObj);
// }
