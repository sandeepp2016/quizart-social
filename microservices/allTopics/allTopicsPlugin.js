module.exports = function(){
  this.add('role:allTopics,action:retrive', function(msg, respond) {
    this.make$('topics_collection').native$(function (err, db) {
      if(err) return respond(err);
        var collection = db.collection('topics_collection');
          collection.find({}).toArray(function(err, documents) {
            if(err) return respond(err);
            respond(null,documents);
          })
        // })
    });
  });
}
