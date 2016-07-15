var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  groupname : {type : String, required: true , index: true},
  groupavatar: {type: String},
  topicid: {type: String , required: true}
});

exports = module.exports = mongoose.model('Groups', GroupSchema);
