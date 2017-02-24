
var request = require('request');

var passwordMap = {};

module.exports = {
	login: login,
	logout: logout,
	isAuthMiddleware: isAuthMiddleware,
	getAuthString: getAuthString
};

function login(req, username, password, cb){
	var url = 'http://chalmerslosers.com:9000/jsb-url/Sandbox/CheckUserName';

	var options = {
		url: url
	};

	options.headers = {
		"Authorization": getAuthString(username, password)
	};

	request(options, function(err, requestRes, body){
		if( requestRes.statusCode == 401 ) return cb && cb("Invalid username or password.");
		if( !!err ) return cb && cb(err);

		req.session.creds = {
			username: username
		};
		passwordMap[req.session.username] = password;

		cb && cb(null, req.session.creds);
	});
}
function logout(req){
	if( !req.session || !req.session.creds ) return;

	var username = req.session.creds.username;
	delete passwordMap[username];
	delete req.session.creds;
}

function isAuthMiddleware(req, res, next){
	if( !req.session.creds ) return res.status(401).send("Unauthorized");
	next();
}

function getAuthString(username, password){
	if( arguments.length == 1 ){
		var req = username;

		if( !req.session.creds ) throw "Not logged in!";
		if( !req.session.creds.username ) throw "No username in credentials!";

		username = req.session.creds.username;

		password = passwordMap[username];
	}
	if( !password ) throw "No password found for: "+username;

	return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}
