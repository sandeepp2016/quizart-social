module.exports = function(){
  this.add('role:question,action:random', function(msg, respond) {
    this.make$('questionBank').native$(function (err, db) {
      if(err) return respond(err);

        console.log('\n No of questions to fetch: '+msg.noOfQuestions+'\n')
        console.log('\n Topic to fetch random questions on is:  '+msg.topicId+'\n')
        var collection = db.collection('questionBank');
        collection.count({topicId:msg.topicId},function(err,res){
          var r = Math.floor(Math.random() * res);
          console.log("number of records "+res+", number of records will be skip -- "+r);
          collection.find({'topicId':msg.topicId}).limit(msg.noOfQuestions).skip(r).toArray(function(err, documents) {
            if(err) return respond(err);
            console.log('\n Questions fetched are: '+documents+'\n');
            respond(null,{questions:documents});
          })
        })
    });
  });
}
