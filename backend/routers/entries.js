
var _ = require('underscore');

var express = require('express');

var request = require('request');

var sendError = require('../lib/send-error.js');

module.exports = (function(){
	var router = express.Router();

	router.get('', function(req, res){
		var take = req.query.take;
		var skip = req.query.skip;

		var options = {
			url: 'http://chalmerslosers.com:9000/jsb-url/Sandbox/ReadEntries/json'
		};

		var authString = 'Basic c3ltcG9zaWV0Og==';
		
		if( !!req.isAuthenticated ){
			authString = 'Basic lalalalala';
		}

		options.headers = {
			"Authorization": authString
		};

		request(options, function(err, requestRes, body){
			if( !!err ) return sendError(res, "Unable to get messages.", err);

			//if( requestRes.statusCode !== 200 ) return sendError(res, "Invalid response code for messages: "+requestRes.statusCode);
			
			var entries = JSON.parse(body);
			if( !!entries.Entries ) entries = entries.Entries;

			_.each(entries, function(entry){
				if( !!entry.Secret ){
					entry.Message = null;
					entry.Signature = null;
				}
			});

			res.json(entries);
		});
	});

	router.post('', function(req, res){
		res.send(req.body);
	});

	return router;
})();
