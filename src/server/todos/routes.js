// File: db.js
// Updated January 2017

var mongoose = require('mongoose');
var Todo = require('../db/db').Todo; // Schema defined inside of db.js
var express = require('express');
var router = express.Router();

// Visiting <site_name>/todos/ will respond with this
router.get('/', function(req, res) {
	Todo.find(function(err, results) {
		if (err) { console.log(err); }
		// Send the todo object
		res.send({ todos: results });
	});
});

// Save todo's to database
router.post('/', function(req, res) {
	// req.body is what we read from the data being sent
	var todo = new Todo(req.body);
	console.log(req.body);
	todo.save(function(err) {
		if (err) { console.log(err); }
		res.send("ToDo saved");
	});
});

// Update an existing todo in the database
router.put('/:id', function(req, res) {
	var id = req.params.id;
	Todo.update(
		// Match the obj we're sending from the client to the obj in the database
		{ _id: mongoose.Types.ObjectId(id) }, 

		{ $set: { task: req.body.task } }, 

		function(err) {
			if (err) { console.log(err); }
			res.send('ToDo updated');
		}
	);
});

// Delete todo from database
router.delete('/:id', function(req, res) {
	var id = req.params.id;
	Todo.remove(
		{ _id: mongoose.Types.ObjectId(id) },
		function(err) {
			if (err) { console.log(err); }
			res.send('ToDo deleted');
		}
	);
});

module.exports = router;
