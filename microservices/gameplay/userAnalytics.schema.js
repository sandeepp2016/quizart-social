var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 userAnalyticsSchema = new Schema({
     userId: {type:String},
     gameId: {type:String},
     tournamentId: {type:String},
     topicId: {type:String},
     questionId: {type:String},
     selectedOptionId : {type:String},
     responseType : {type:String},
     responseTime: {type:Number},
     questionNumber : {type:Number},
     gameTime: {type:Date},
     insertTime: {type:Date}
 });

 exports = module.exports = mongoose.model('userAnalytics', userAnalyticsSchema);
