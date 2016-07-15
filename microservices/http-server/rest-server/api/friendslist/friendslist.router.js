var router = require('express').Router();
var controller = require('./friendslist.controller');

router.get('/:uid',controller.getfriendslist);
// router.get('/groups/:uid',controller.getgroupslist);
// router.post('/addgroup',controller.addgroup);

exports = module.exports = router;
