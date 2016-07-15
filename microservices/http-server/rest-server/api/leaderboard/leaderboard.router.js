const router = require('express').Router();
const leaderboardController = require('./leaderboard.controller');
const context = require('../../context');

router.post('/',leaderboardController.create);
router.get('/:id',leaderboardController.retrieveLeaderboard);
//router.get('/:id', tournamentController.retrieveTournament);

exports = module.exports = router;
