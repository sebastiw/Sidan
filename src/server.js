
if( !!process.env.DEBUG ){
	console.warn("Running in DEBUG mode!");
}

var fs = require('fs');
var path = require('path');

var _ = require('underscore');

var Q = require('q');

var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// WEB
var routes = fs.readdirSync("./routers/");
routes = _.chain(routes)
.filter(function(file){
	return file.slice(-3) == ".js";
})
.map(function(file){
	return file.slice(0, -3);
})
.value();

_.each(routes, function(name){
	app.use('/json/'+name, require('./routers/'+name+'.js'));
});

app.use(express.static('www/'));

var port = process.env.PORT || 8080; // set our port
var server = app.listen(port);
console.log('Sidan started:', port);
