var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema = new Schema({
  // subject: { type: [String] , required: true, index: true},
  // relation: { type: String , required: true},
  // object: { type: String , required: true}
  username: { type: String, required: true, unique: true, index: true },
  useravatar :{ type: String},
  age :{ type: Number},
  country :{ type: String},
  totalGames :{ type: Number},
  liketopics: { type: [String]},
  following: {type : Number},
  followers: {type: Number},
  category: {type: String}
});

exports = module.exports = mongoose.model('UserProfile', UserProfileSchema);
