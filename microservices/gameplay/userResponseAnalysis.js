// var userAnalyticsSchema=require('../../models/userAnalytics'),
    // analyticsDbObj = require('./../analyticsDbConObj'),
    // questionAnalytics=require('../../models/questionAnalytics'),
    // userAnalytics = analyticsDbObj.model('userAnalytics', userAnalyticsSchema);
    var mongoose = require('mongoose')


      const connection = mongoose.createConnection('mongodb://192.168.99.100:27017/boilerplate-production');

      connection.on('connected', function() {
        console.log('Mongoose connection open to: ' + 'mongodb://192.168.99.100:27017/boilerplate-production');
      });

      connection.on('error', function() {
        console.error('Mongoose connection error: ' + 'mongodb://192.168.99.100:27017/boilerplate-production');
      });

      process.on('SIGINT', function() {
        mongoose.connection.close(function() {
          console.log('Mongoose connection disconnected due to app SIGINT.');
        });
      });

    const userAnalytics = connection.model('userAnalytics', require('./userAnalytics.schema.js'));


// get overall points for all users
var o = {};
o.map = function () {
                       var key = this.userId;
                       var value = {
                           responseTime : this.responseTime,
                           count :1,
                           responseType : this.responseType
                       }
                        emit(key, value);
                   }

o.reduce = function (key, values ) {
        // return vals = Array.sum(values);
        var reducedObject = {
                              userId: key,
                              totalResponseTime: 0,
                              numOfQuesAttempted:0,
                              avgResponseTime:0,
                              correctResponseCount:0,
                              wrongResponseCount:0,
                              skipResponseCount:0,
                              correctPercentage:0,
                              wrongPercentage:0,
                              skipPercentage:0,
                            };

        values.forEach( function(value) {
                               if(value.responseTime!=undefined){
                                   reducedObject.totalResponseTime += value.responseTime;
                               }
                               if(value.count!=undefined){
                                   reducedObject.numOfQuesAttempted += value.count;
                               }
                              if ( value.responseType == 'correct' ){
                                  reducedObject.correctResponseCount += 1;
                              }
                              else if ( value.responseType == 'wrong' ) {
                                  reducedObject.wrongResponseCount += 1;
                              }
                              else {
                                  reducedObject.skipResponseCount += 1;
                              }
                        }
                      );
        return reducedObject;

     }

o.finalize  = function (key, reducedValue) {

                               if (reducedValue.numOfQuesAttempted > 0){
                                   reducedValue.avgResponseTime = reducedValue.totalResponseTime / reducedValue.numOfQuesAttempted;
                                   reducedValue.correctPercentage = (reducedValue.correctResponseCount * 100)/reducedValue.numOfQuesAttempted;
                                   reducedValue.wrongPercentage = (reducedValue.wrongResponseCount * 100)/reducedValue.numOfQuesAttempted;
                                   reducedValue.skipPercentage = (reducedValue.skipResponseCount * 100)/reducedValue.numOfQuesAttempted;
                               }
                               return reducedValue;
                            };

// o.map = function() {
//   emit(this.userId, {responseTime: this.responseTime});
// }
// o.reduce = function(key, values) {
//   var sum = 0;
//   values.forEach(function(value) {
//     if(value) { sum += value.responseTime; }
//   });
//
//   return {avgResponse: sum/values.length};
// }
//console.log('Here');

// o.query = { 'userId' : '1@123'};
// o.out = {replace:'testMapReduceOutput'};
// {out:{merge:"tmp"},query:{userId:"1@123"}}

userAnalytics.mapReduce(o, function (err, results) {
  if(err) { return console.error(err); }
  console.log('result', results);
  
    var storeData = require('./gameManagerPlugin');
    results.forEach(function(newRec){
        var combinedDataObj = newRec.value;
        storeData.saveData(combinedDataObj,function(data) {
            // console.log(data);
        });
    });
   // analyticsDbObj.close();
   mongoose.connection.close(function() {
     console.log('Mongoose connection disconnected.');
   });
  //  return results;
});
