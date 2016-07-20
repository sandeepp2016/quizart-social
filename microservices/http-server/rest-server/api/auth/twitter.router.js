
const router = require('express').Router();
twitterController  = require('./twitter.auth.controller');
const context = require('../../context');
router.get('/twitter/authUrl',context.authorizeMiddleware,twitterController.getRequestToken);
router.get('/twitter/success',twitterController.getAccessToken);

exports = module.exports = router;
