
var express = require('express');

module.exports = (function(){
	var router = express.Router();

	router.get('', function(req, res){
		res.json({
			test: 'lala'
		});
	});

	router.get('/:input', function(req, res){
		res.send(req.params.input);
	});

	return router;
})();
