module.exports = function(){
  this.add('role:myFav,action:retrive', function(msg, respond) {
    this.make('profile_collection').load$({userId:msg.user},function(err,user_profile){
      this.make$('topics_collection').native$(function (err, db) {
        if(err) return respond(err);
          var collection = db.collection('topics_collection');
            collection.find({_id:{$in:user_profile.likeTopics}}).limit(4).toArray(function(err, documents) {
              if(err) return respond(err);
              console.log('this is you toic =-=00000000000000004444444444444',documents);
              documents[0]["like"] = user_profile.likeTopics;
              respond(null,documents);
            })
      });
    });
  });
}
