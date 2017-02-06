
var _ = require('underscore');

var express = require('express');

var request = require('request');

var sendError = require('../lib/send-error.js');

module.exports = (function(){
    var router = express.Router();

    router.get('', function(req, res){
        var options = {
            url: 'http://chalmerslosers.com:9000/jsb-url/Sandbox/ReadPoll/json'
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

            var poll = JSON.parse(body);
            if( !!poll.Poll ) poll = poll.Poll;

            res.json(poll);
        });
    });

    router.post('', function(req, res){
        res.send(req.body);
    });

    return router;
})();
