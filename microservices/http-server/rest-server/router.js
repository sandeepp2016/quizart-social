var router = require('express').Router();

router.use('/account', require('./api/account/account.router'));
router.use('/authenticate', require('./api/authenticate/authenticate.router'));
router.use('/signup', require('./api/signup/signup.router'));
router.use('/friendslist', require('./api/friendslist/friendslist.router'));
router.use('/groupslist', require('./api/groupslist/groupslist.router'));


exports = module.exports = router;
