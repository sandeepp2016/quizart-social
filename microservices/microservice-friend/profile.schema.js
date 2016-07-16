var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfileSchema  = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  useravatar :{ type: String},
  name: {type : String},
  age :{ type: Number},
  country :{ type: String},
  totalgames :{ type: Number},
  liketopics: { type: [String]},
  following: {type : Number},
  followers: {type: Number},
  category: {type: String},
  friends :{type: [String]},
  ranking : {type: Number, default: 1200}
});

exports = module.exports = mongoose.model('UserProfile', UserProfileSchema );
