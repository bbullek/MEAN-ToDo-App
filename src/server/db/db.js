// File: db.js
// Updated January 2017

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos'); // Database name

// Define a schema for our todos
var Todo = mongoose.model('Todo', {
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
});

module.exports.Todo = Todo;
