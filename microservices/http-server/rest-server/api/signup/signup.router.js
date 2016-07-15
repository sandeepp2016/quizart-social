var router = require('express').Router();
var controller = require('./signup.controller');

router.post('/',controller.signup);

exports = module.exports = router;
