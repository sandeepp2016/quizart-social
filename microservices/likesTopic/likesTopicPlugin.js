module.exports = function(){
  this.add('role:topic,action:like',function(msg,result){
    this.make('topics_collection').load$(msg.data.id,function(err,res){
      console.log(res.topicFollowers+'--------'+res.topicName);
      if(msg.data.incre==true) res.topicFollowers++;
      else res.topicFollowers--;
      console.log(res.topicFollowers+'------------------------------===============-followers');
      res.data$({
        topicFollowers:res.topicFollowers
      }).save$(result)
      this.make$('profile_collection').native$(function(err, db) {
        if(err) return respond(err);
          var collection = db.collection('profile_collection');
            collection.update({userId:msg.data.username},{$addToSet:{likeTopics:res.id}},function(err, documents) {
              if(err) return respond(err);
              console.log('documents---------------------------- ', documents);
              respond(null,documents);
          })
      });
    });
  })
}
