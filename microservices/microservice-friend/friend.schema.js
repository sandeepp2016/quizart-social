var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
  subject: { type: [String] , required: true, index: true},
  relation: { type: String , required: true},
  object: { type: [String] }
});

exports = module.exports = mongoose.model('Friend', FriendSchema);
