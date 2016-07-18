var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var TournamentSchema = new Schema({
  title: { type: String, required: true },
  avatarURL: { type: String, required: true },
  imageURL: { type: String, required: true },
  overlayTitle: { type: String, required: true },
  overlaySubtitle: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  prizes: { type: String, required: true },
  level: { type: Number, required: true },
  regEndDate: { type: Date, required: true },
  tourStartDate: { type: Date, required: true },
  tourEndDate: { type: Date, required: true },
  currentLevel: { type: Number, default: 1},
  topics: { type: String, required: true },
  playersPerGame: { type: Number, required: true },
  eliminationPercentagePerGame: { type: String, default: 50},
  registeredPlayers: [{userId: { type: String, required: true }}],
  gamePlayedPlayers: [{userId: { type: String, required: true }}],
  levelWinners: [{userId: { type: String, required: true }}]
});*/

var TournamentSchema = new Schema({
  title: { type: String, required: true },
  avatarURL: { type: String, required: true },
  imageURL: { type: String, required: true },
  overlayTitle: { type: String, required: true },
  overlaySubtitle: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  prizes: { type: String, required: true },
  eliminationPercentagePerGame: { type: Number, default: 50 },
  noOfLevels: { type: Number, required: true },
  topics: { type: String, required: true },
  isComplete: { type:Boolean, default: false },
  currentLevel: { type: Number, default: 1 },
  playersPerGame: { type: Number, required: true },
  regEndDate: { type: Date, required: true },
  levels: [{
    tourStartDate: { type: Date, required: true },
    tourEndDate: { type: Date, required: true },
    registeredPlayers: [{userId: { type: String, required: true }}],
    levelWinners: [{userId: { type: String, required: true }}],
    gamePlayedPlayers: [{
        userId: { type: String, required: true },
        score: { type: String, required: true }
    }]
  }]
});

exports = module.exports = mongoose.model('Tournament', TournamentSchema);
