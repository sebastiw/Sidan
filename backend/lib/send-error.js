
module.exports = function(res, status, message, err){
	if( arguments.length == 3 && isNaN(status) ){
		err = message;
		message = status;
		status = 500;
	}
	if( !!err ) console.error(message, err);
	res.status(status).send(message);
};
