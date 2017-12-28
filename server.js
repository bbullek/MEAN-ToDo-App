// File: server.js
// December 2017

var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

// Define a route at the root of the app
app.all('/w', function(request, response) {
	response.send('\
		<!DOCTYPE html>\
		<html>\
			<head>\
				<title>MEAN ToDo App</title>\
			</head>\
			<body>\
				<h1>Hello, this is the app</h1>\
			</body>\
		</html>\
	');
});

app.listen(PORT, function() {
	console.log('Server running on ' + PORT);
});