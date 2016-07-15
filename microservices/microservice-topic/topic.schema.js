var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  _id: { type: String, required: true, unique: true, index: true },
  topicName:{ type: String},
  topicIcon:{ type: String},
  topicDescription:{ type: String},
  topicFollowers:{ type: Number},
  playersPerMatch:{ type: Number},
  topicCategory:{ type: String}
});

exports = module.exports = mongoose.model('topics_collection', TopicSchema,'topics_collection');
