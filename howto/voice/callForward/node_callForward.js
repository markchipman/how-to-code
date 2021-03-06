//NodeJS

//Need a phone number to transfer to
var transferTo = '{{yourPhoneNumber}}';

//Demo uses express 4.x
var express = require('express');
var bodyParser = require('body-parser')
var PORT = 8080;

//Require SDK
var Bandwidth = require('node-bandwidth');

//Create SDK
var client = new Bandwidth({
	userId    : '{{userId}}', // <-- note, this is not the same as the username you used to login to the portal
	apiToken  : '{{apiToken}}',
	apiSecret : '{{apiSecret}}'
});

// Created application Id
var applicationId = '{{a-xxxxx}}';

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/incomingCall', function (req, res) {
	var state = req.body.eventType;
	var callId = req.body.callId;
	
	// Handle incoming call and answer it
	// You can remove this handler if you set autoAnswer=true for your application on Catapult dashboard
	if( state === 'incomingcall' ) {
		client.Application.get(applicationId)
			.then(function(app) {
				if (!app.autoAnswer) {
					// Answer from code only if autoAnswer === false only
					return client.Call.answer(callId);
				}
			})
			.then(function() {
				console.log('Answered incoming call');
			})
	}

	// Reply on an answer event.
	if( state === 'answer' ) {
		var incomingCallId = req.body.from;
		// Some extra options
		var transferPayload = {
			transferTo       : transferTo,
			transferCallerId : incomingCallId,
			whisperAudio     : {
				sentence : 'You have an incoming call',
				gender   : 'female',
				voice    : 'julie',
				locale   : 'en'
			}
		};

		client.Call.transfer(callId, transferPayload)
		.then(function (transferredCall) {
			console.log('Transfered call has id: ' + transferredCall.id);
		});
	}
	// We don't need to wait on the transfer to post back to bandwidth, as we're async to the API
	res.send(200);
});

app.listen(PORT, function () {
	console.log('Server listening on: http://localhost:%s/incomingCall', PORT);
});
