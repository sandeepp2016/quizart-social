var router = require('express').Router();
var controller = require('./leavegroup.controller');


router.post('/',controller.leavegroup);

exports = module.exports = router;
