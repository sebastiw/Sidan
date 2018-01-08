
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

var session = require('express-session');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'makeClGr34tAg4in', cookie: { maxAge: 60000 }}));

// json api
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

// webapp
app.use('/assets', express.static('www/assets/'));
app.get('*', function(req, res){

	if( req.path.indexOf('.bundle.') > 0 ){
		var bundlePath = path.join(__dirname, 'www', req.path.substr(1));
		return res.sendFile(bundlePath);
	}

	var indexPath = path.join(__dirname, 'www/index.html');
	if( !fs.existsSync(indexPath) ) return res.status(404).send("Unable to load sidan (tm).");

  res.sendFile(indexPath);
});

// start server
var port = process.env.PORT || 8080; // set our port
var server = app.listen(port);
console.log('Sidan started:', port);
