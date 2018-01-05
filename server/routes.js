// File: routes.js
// Updated January 2017

var todosRoutes = require('server/todos/routes');

module.exports = function routes(app) {
	// Anything URL that includes '/todos' will be sent to this controller
	app.use('/todos', todosRoute);
};