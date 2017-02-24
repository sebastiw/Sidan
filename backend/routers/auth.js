
var express = require('express');

var auth = require('../lib/auth.js');

var sendError = require('../lib/send-error.js');

module.exports = (function(){
	var router = express.Router();

	router.get('', function(req, res){
		res.json(req.session.creds);
	});

	router.post('', function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		auth.login(req, username, password, function(err, user){
			if( !!err ) return sendError(res, "Unable to login: "+username, err);

			res.status(200).json(user);
		});
	});

	router.post('/logout', function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		auth.logout(req);

		res.status(200).send("OK");
	});

	return router;
})();
