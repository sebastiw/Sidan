
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

        var options = {
            url: 'http://chalmerslosers.com:9000/jsb-url/Sandbox/ReadArticles/json' + query
        };

        var authString = 'Basic c3ltcG9zaWV0Og==';

        if( !!req.isAuthenticated ){
            authString = 'Basic lalalalala';
        }

        options.headers = {
            "Authorization": authString
        };

        request(options, function(err, requestRes, body){
            if( !!err ) return sendError(res, "Unable to get articles.", err);

            //if( requestRes.statusCode !== 200 ) return sendError(res, "Invalid response code for articles: "+requestRes.statusCode);

            var articles = JSON.parse(body);
            if( !!articles.Articles ) articles = articles.Articles;

            res.json(articles);
        });
    });


    router.post('', function(req, res){
        res.send(req.body);
    });

    return router;
})();
