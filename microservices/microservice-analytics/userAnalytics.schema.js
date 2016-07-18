/**
 * Created by GH316885 on 3/17/2016.
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 userAnalyticsSchema = new Schema({
     userId: {type:String},
     gameId: {type:String},
     tournamentId: {type:String},
     topicId: {type:String},
     questionId: {type:String},
     selectedOptionId : {type:Number},
     responseType : {type:String},
     responseTime: {type:Number},
     questionNumber : {type:Number},
     gameTime: {type:Date},
     insertTime: {type:Date}
 });

 exports = module.exports = mongoose.model('userAnalytics', userAnalyticsSchema);
