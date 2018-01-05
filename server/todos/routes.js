// File: db.js
// Updated January 2017

var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo; // Schema defined inside of db.js
var express = require('express');
var router = express.Router();

// Visiting <site_name>/todos/ will respond with this msg
router.get('/', function(req, res) {
	res.send('Hello from /todos');
});

module.exports = router;