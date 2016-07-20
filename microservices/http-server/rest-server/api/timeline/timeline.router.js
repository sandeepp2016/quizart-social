
const router = require('express').Router();
twitterController  = require('./twitter.controller');
const context = require('../../context');
router.get("/twitter/createAuthToken",context.authorizeMiddleware,twitterController.createToken);
router.get("/twitter/getTwitterData/:id",twitterController.getTwitterData);
router.post("/twitter/postToTwitter",twitterController.postToTwitter);
exports = module.exports = router;
