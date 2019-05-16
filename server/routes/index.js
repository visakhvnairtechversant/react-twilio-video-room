var express = require('express');
var router = express.Router();
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;



// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = '';
var API_KEY_SID = '';
var API_KEY_SECRET = '';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/token',function(req, res, next){
	// Create an Access Token
	var accessToken = new AccessToken(
		ACCOUNT_SID,
		API_KEY_SID,
		API_KEY_SECRET
		);

	// Set the Identity of this token
	accessToken.identity = 'user'+Math.floor(Math.random() * (+10 - +0)) + +0;

	// Grant access to Video
	var grant = new VideoGrant();
	grant.room = 'cool room';
	accessToken.addGrant(grant);

	// Serialize the token as a JWT
	var jwt = accessToken.toJwt();
	console.log(jwt);
	res.json({"identity":accessToken.identity,"token":jwt})
});






module.exports = router;
