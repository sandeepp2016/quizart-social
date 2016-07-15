const router = require('express').Router();
const topicController = require('./topic.controller');
const context = require('../../context');

router.get('/:id',topicController.getTopic);

exports = module.exports = router;
