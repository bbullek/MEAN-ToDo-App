// File: server.js
// Updated December 2017

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./src/server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

// Define a route at the root of the app
app.all('/*', function(req, res) {
	res.send('\
		<!DOCTYPE html>\
		<html>\
			<head>\
				<title>MEAN ToDo App</title>\
				<base href="/">\
			</head>\
			<body>\
				<div ui-view></div>\
				<script src="/bundle.js"></script>\
			</body>\
		</html>\
	');
});

app.listen(PORT, function() {
	console.log('Server running on ' + PORT);
});
