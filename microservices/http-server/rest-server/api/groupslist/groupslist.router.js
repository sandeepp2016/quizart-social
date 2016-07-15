var router = require('express').Router();
var controller = require('./groupslist.controller');

// router.get('/:uid',controller.getfriendslist);
router.get('/:uid',controller.getgroupslist);
router.get('/getgroupmembers/:gid',controller.getgroupmembers);
router.post('/addgroup',controller.addgroup);

exports = module.exports = router;
