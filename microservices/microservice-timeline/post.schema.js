var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentPostSchema = new Schema({
//  id: { type: String, required: true, unique: true, index: true },
  parentId:{ type: String, required: true },
  text: { type: String, required: true },
  imgUrl:{type:String},
  user:{type:String,required:true},
  postDate:{type:Date,required:true}
});

exports = module.exports = mongoose.model('posts',TournamentPostSchema);
