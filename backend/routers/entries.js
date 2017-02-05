
var _ = require('underscore');

var express = require('express');

var request = require('request');

var sendError = require('../lib/send-error.js');

module.exports = (function(){
	var router = express.Router();

	router.get('', function(req, res){

		var query = "";
		if( !!req.query.take ){
			query = "?Take="+req.query.take;
		}
		if( !!req.query.skip ){
			query = (query && query+'&') || "?";
			query += "Skip="+req.query.skip;
		}

		var url = 'http://chalmerslosers.com:9000/jsb-url/Sandbox/ReadEntries/json'+query;

		var options = {
			url: url
		};

		var authString = 'Basic c3ltcG9zaWV0Og==';
		if( !!req.isAuthenticated ) authString = createAuth(req);

		options.headers = {
			"Authorization": authString
		};

		request(options, function(err, requestRes, body){
			if( !!err ) return sendError(res, "Unable to get entries.", err);

			//if( requestRes.statusCode !== 200 ) return sendError(res, "Invalid response code for entries: "+requestRes.statusCode);
			
			var entries = JSON.parse(body);
			if( !!entries.Entries ) entries = entries.Entries;

			_.each(entries, function(entry){
				if( !!entry.Secret ){
					entry.Message = null;
				}
			});

			res.json(entries);
		});
	});

	router.post('', function(req, res){
		var url = 'http://chalmerslosers.com:9000/jsb-url/Sandbox/CreateEntry';

		var options = {
			url: url
		};

		var entry = req.body;
		options.qs = entry;

		var authString = 'Basic c3ltcG9zaWV0Og==';
		if( !!req.isAuthenticated ) authString = createAuth(req);

		options.headers = {
			"Authorization": authString
		};

		request(options, function(err, requestRes, body){
			if( !!err ) return sendError(res, "Unable to post entry.", err);

			res.json(entry);
		});
	});

	return router;
})();

function createAuth(req){
	return "Basic lalala";
}
