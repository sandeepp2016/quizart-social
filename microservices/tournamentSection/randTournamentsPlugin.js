module.exports = function(){
  this.add('role:randTournaments,action:retrive', function(msg, respond) {
    this.make$('tournaments_rebuild').native$(function (err, db) {
      if(err) return respond(err);
        var collection = db.collection('tournaments_rebuild');
        // collection.count({"title" :"Lord Of Series"},function(err,res){
          // var r = Math.floor(Math.random() * res);
          // console.log("number of recoreds"+res+"number of records will be skip -- "+r);
          collection.find({}).limit(2).toArray(function(err, documents) {
            if(err) return respond(err);
            respond(null,documents);
          })
        // })
    });
  });
}
