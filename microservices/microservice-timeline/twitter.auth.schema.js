var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  username:{ type: String,unique:true, required: true},
  key: { type: String, required: true },
  secret:{type:String,required:true},
  userId:{type:String,required:true}
});

exports = module.exports = mongoose.model('TwitterAuth',schema);
