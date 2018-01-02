// File: config.js
// Updated December 2017

// This is where our main Angular module will live and where we will configure 
// our routes.

import angular from "angular"; // ES6 syntax, not vanilla JS
import uiRouter from "angular-ui-router";
import todosController from 'todos/todos';

const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	// Redirect to root of our app if any other url is entered
	$urlRouterProvider.otherwise('/');

    // Define the states of our web app
	$stateProvider
		.state('todos', {
            url: '/',
            template: require('todos/todos.html'),
            controller: todosController
        })
        .state('about', {
            url:  '/about',
            template: require('about/about.html')
        })

    $locationProvider.html5Mode(true);
});

export default app;
