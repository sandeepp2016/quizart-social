module.exports = function(){
  this.add('role:allTournaments,action:retrive', function(msg, respond) {
    this.make$('tournaments_rebuild').native$(function (err, db) {
      if(err) return respond(err);
        var collection = db.collection('tournaments_rebuild');
          collection.find({}).toArray(function(err, documents) {
            if(err) return respond(err);
            respond(null,documents);
          })
        // })
    });
  });
}
