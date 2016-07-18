const redis=require('redis');
const fs = require('fs');
const subscriber=redis.createClient(6379,'172.23.238.253');
const publisher=redis.createClient(6379,'172.23.238.253');

console.log("Running...");

subscriber.subscribe('uuidgenerator');

subscriber.on('message',function(channel,message){
      console.log("Subscribed to "+channel);
      // console.log("UUID to be published into the following channel,",JSON.parse(message));
      // console.log("UUID to be published into the following channel,",message);
      var message1 = JSON.parse(message);
      var MsgObj = { '1234': [ { message: 'Hi', sentBy: 'Chanda' } ] };
      console.log("UUID to be published into the following channel:",message1);
      console.log("Command received is:",message1.command);

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
          message : { content: uuid, command : 'generateUUID' },
          details : message1.details
        }
        publisher.publish(message1.message.content,JSON.stringify(publishMsg));
      }
      else if(message1.command === 'sendMessage'){
            var publishMsg = {
              message : message1.content.text,
              sentBy : message1.content.sentBy
            }
            var topicId = message1.content.topic;
            publisher.publish(message1.content.topic,JSON.stringify(publishMsg));
              if(!MsgObj[topicId]){
                      console.log("Msg from client is===",publishMsg);
                      console.log("topic id to put into obj",topicId);
                      MsgObj[topicId] = [publishMsg];
                      console.log("Msgobj updated is ",MsgObj);
              }
              else{
                    console.log("inside else loop for saving message");
                    var arr = MsgObj[topicId];
                    console.log("Already existing array is:",arr);
                    console.log("Length of array for the topic id "+topicId+" is "+arr.length);
                    if(arr.length>=1){
                      fs.mkdir('/data/chathistory/'+topicId,function(err,result){
                      console.log("Inside loop for creating directory");
                        if(err){
                          console.log("Inside loop for creating directory and ther is an error logging the error",err);
                          console.log("Inside loop for creating directory and ther is an error");
                            if(err.code === "EEXIST"){
                              console.log("History folder already Exist");
                              fs.readdir('/data/chathistory/'+topicId,function(err,files){
                                  console.log("Inside Read File directory, retrieved number of files are,==",files);
                                  console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
                                  var fileNumber = files.length;
                                  var file = '/data/chathistory/'+topicId+'/'+topicId+'-'+(fileNumber+1)+'.json';
                                  console.log("Inside loop for creating directory the new file to be written in old folder is ",file);
                                  fs.writeFile(file,JSON.stringify(publishMsg),'utf-8',function cb(err,data){
                                      if(err){console.log("Error when writing the file and the error is ",err);}
                                      MsgObj[topicId] = [];
                                      MsgObj[topicId] = [publishMsg];
                                  });
                              });
                            }
                        }
                        else{
                          console.log("Inside loop for creating directory and ther is no folder existing ,so folder created");
                          var file = '/data/chathistory/'+topicId+'/'+topicId+'-1.json';
                          console.log("Inside loop for creating directory the new file to be written in new folder is ",file);
                          fs.writeFile(file,JSON.stringify(publishMsg),'utf-8',function cb(err,data){
                              if(err){console.log("Error when writing the file and the error is ",err);}
                              MsgObj[topicId] = [];
                              MsgObj[topicId] = [publishMsg];
                              console.log("The New Message Object updated is ",MsgObj);
                          });
                        }
                      });
                    }
                    else{
                      arr.unshift(publishMsg);
                      MsgObj[topicId] = arr;
                      console.log("inside save and update history, the MsgObj now is===",MsgObj);
                  }
                }
              } //end of else if for send and save message

          else if(message1.command === 'retrieveHistory'){
            var topicId = message1.content;
            console.log("The topic id to be sent to read the file is",topicId);
            console.log("The type topic id to be sent to read the file is",typeof(topicId));
            console.log("The type topic id to be sent to read the file is",message1.content);
            fs.readdir('/data/chathistory/'+topicId,function(err,files){
              console.log("Inside Read File directory, retrieved number of files are,==",files);
              console.log("Inside Read File directory, retrieved number of files length is,==",files.length);
              if(err){
                console.log("Throwed an error while reading the directory:",err);
              }
              var fileNumber = files.length;
              var fileToRead = '/data/chathistory/'+topicId+'/'+topicId+'-'+fileNumber+'.json';
              console.log("FileToRead is ",fileToRead);
              fs.readFile(fileToRead,'utf-8',function cb(err,data){
                if(err){console.log("error while reading the file to retrieve history");}
                obj = JSON.parse(data);
                console.log("Parsed file data to retrive history:",obj);
                publisher.publish(message1.content,JSON.stringify(data));
              });
            });
          }


});
