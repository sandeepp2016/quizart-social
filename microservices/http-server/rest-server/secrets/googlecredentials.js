
var redirectHost = process.env.REDIRECT_HOST || "localhost";
var redirectPort = process.env.REDIRECT_PORT || "8001";

module.exports = {
	OAUTHURL    :   'https://accounts.google.com/o/oauth2/auth?',
	VALIDURL    :   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
	SCOPE       :  [
						'https://www.googleapis.com/auth/userinfo.profile',
						'https://www.googleapis.com/auth/userinfo.email'
				   ],
	CLIENT_ID   :  '521840119338-usrphlmfqqlv6mrvudl1ajs5o7ld0tnb.apps.googleusercontent.com',
	CLIENT_SECRET :  '9-yVYyE7IYHnUTZS42y1R7Rb',
	REDIRECT_URL   : 'http://'+redirectHost+':'+redirectPort+'/api/auth/success/google',
	TYPE        :   'token'
};
