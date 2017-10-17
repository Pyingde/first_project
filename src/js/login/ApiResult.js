module.exports = function(_result, _data, _message, _cookie){
	return JSON.stringify({status: _result, data: _data || null, cookie: _cookie, message: _message || null});
}