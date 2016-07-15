module.exports = function(){
  this.add('role:topic,action:delete', function(msg, respond) {
    this.make$('profile_collection').native$(function(err, db) {
      if(err) return respond(err);
        var collection = db.collection('profile_collection');
        console.log('>>>>>>>>>>>>>>>>>>>>>>>'+msg.data.username+msg.data.id);
          collection.update(
            {userId:msg.data.username},
            {$pull:{likeTopics:{$in:[msg.data.id]}}},
            function(err, documents) {
            if(err) return respond(err);
            console.log('documents---------------------------- ', documents);
            respond(null,{"records":documents});
        })
    });
  });
}
