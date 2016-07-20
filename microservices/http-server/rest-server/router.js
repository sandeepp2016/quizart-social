var router = require('express').Router();

router.use('/account', require('./api/account/account.router'));
router.use('/authenticate', require('./api/authenticate/authenticate.router'));
router.use('/signup', require('./api/signup/signup.router'));
router.use('/friendslist', require('./api/friendslist/friendslist.router'));
router.use('/groupslist', require('./api/groupslist/groupslist.router'));
router.use('/leaderboard', require('./api/leaderboard/leaderboard.router'));
router.use('/tournaments', require('./api/tournament/tournament.router'));
router.use('/profile', require('./api/profile/profile.router'));
router.use('/friend', require('./api/friend/friend.router'));
router.use('/topic', require('./api/topic/topic.router'));
router.use('/leavegroup', require('./api/leavegroup/leavegroup.router'));
router.use('/timeline', require('./api/timeline/timeline.router'));
router.use('/auth', require('./api/auth/twitter.router'));
router.use('/analytics', require('./api/analytics/analytics.router'));


exports = module.exports = router;
