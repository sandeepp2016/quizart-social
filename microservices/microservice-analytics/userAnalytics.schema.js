/**
 * Created by GH316885 on 3/17/2016.
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
    userAnalyticsSchema = new Schema({
        userId: String,
        gameId: String,
        tournamentId: String,
        topicId: String,
        questionId: String,
        selectedOptionId : Number,
        responseType : String,
        responseTime: Number,
        questionNumber : Number,
        gameTime: Date,
        insertTime: Date
    });

    exports = module.exports = userAnalyticsSchema;
