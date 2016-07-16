const router = require('express').Router();
const analyticsController = require('./analytics.controller');
const context = require('../../context');

router.post('/',analyticsController.create);

exports = module.exports = router;
