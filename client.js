var http = require('http');

var options = {
	host: 'localhost',
	port: '8081',
	path: '/index.html'
};

// callback function is used to deal with response
var callback = function(res){
	// continously update stream with data
	var body = '';
	res.on('data', function(data){
		body+=data;
	})

	res.on('end', function(){
		// Data recieved completely.
		console.log(body);
	})
}

// Make a request to the server
var req = http.request(options, callback);
req.end();