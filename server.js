var http	= require('http');	//Http module
var fs		= require('fs');  //File input output module
var url		= require('url'); //url module

console.log('hi there..');

// Create a server..
http.createServer(function(req, res){
	// Parse the request containing file name
	var pathname = url.parse(req.url).pathname;

	// print the name of the file for which request is made.
	console.log("Request for "+pathname+" received.");

	fs.readFile(pathname.substr(1), function(err, data){
		if(err) {
			console.log(err);
			// HTTP Status 404: Not found
			// Content Type: text/plain
			res.writeHead(404, {'Content-Type': 'text/plain'});
		}else{
			// Page Found
			// HTTP status: 200 : OK
			// content Type: text/plain
			res.writeHead(200, {'Content-Type': 'text/html'});

			res.write(data.toString());
		}

		// Send the response body.
		res.end();
	})

}).listen(8081)