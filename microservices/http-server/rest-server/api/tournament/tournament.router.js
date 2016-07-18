const router = require('express').Router();
const tournamentController = require('./tournament.controller');
const context = require('../../context');

router.post('/',tournamentController.create);
router.get('/',tournamentController.retrieveAll);
router.put('/registerPlayer',tournamentController.registerPlayer);
//router.get('/:id', tournamentController.retrieveTournament);

exports = module.exports = router;
