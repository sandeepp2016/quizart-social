var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaderboardSchema = new Schema({
  leaderboard: [{
      userId: { type: String, required: true },
      score: { type: Number, required: true }
  }]
});

exports = module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
