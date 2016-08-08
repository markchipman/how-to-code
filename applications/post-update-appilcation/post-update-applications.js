//Download the node sdk from ap.bandwidth.com/docs/helper-libraries/node-js
//API credentials which can be found on your account page at https://catapult.inetwork.com/pages/login.jsf
var userId = 'userId';  //{user_id}
var token = 'token'; //{token}
var secret = 'secret'; //{secret}

var Bandwidth = require('node-bandwidth');

var client = new Bandwidth({
	userId: userId,
	apiToken: token,
	apiSecret: secret
});

// Promise
client.Application.update('a-j4f2j6vjh45wsrhzmqz53mq', {
	name: 'Rename App1',
	autoAnswer: false
})
.then(function (response) {
	console.log(response);
});

// Callback
client.Application.update('a-zuwwctyxth6ju4dcfzzrbea',
	{
		name: 'Rename App2',
		autoAnswer: false
	},
	function (err, response) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
});