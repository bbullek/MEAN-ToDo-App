// File: todos-factory.js
// Updated January 2017

import angular from 'angular';
import _ from 'lodash'; // Library that incl. utility to easily remove from array

const todoFactory = angular.module('app.todoFactory', [])

  .factory('todoFactory', ($http) => {

    /*
     * Fetches all of the todo's saved to the database.
     */
    function getTasks($scope) {
      $http.get('/todos').then(response => {
        // Set the displayed todo's to the response we get from the server
        $scope.todos = response.todos;
      });
    }

    /*
     * Saves the task to the todo list when the green 'Create Task' button is 
     * clicked or when the user hits enter.
     */
    function createTask($scope, params) {
      // Clicking 'Create Task' with an empty textbox will not create a new DB entry
      if (!$scope.createTaskInput) { return; }

      $http.post('/todos', {
        task: $scope.createTaskInput,
        isCompleted: false,
        isEditing: false
      }).then(response => {
        getTasks($scope);
        $scope.createTaskInput = ''; // Clear the textbox
      });
    }

    /*
     * Updates the task's name after the user has typed a new string via the Edit
     * button. Also updates the entry in the database.
     */
   function updateTask($scope, todo) {
      $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).then(
        response => {
          getTasks($scope);
          todo.isEditing = false;
      });
    };

    /*
     * Removes the task from the user's todo list when they click the Delete 
     * button. Also deletes it from the database.
     */
    function deleteTask($scope, todoToDelete) {
      $http.delete(`todos/${todoToDelete._id}`).then(response => {
        getTasks($scope);
      });
    }

    /*
     * Monitor the textbox to append new tasks as they are added.
     */
    function watchCreateTaskInput($scope, params, val) {
      // If the textbox was erased, remove the old task entry from todos
      if (!val && params.createHasInput) {
        $scope.todos.pop();
        params.createHasInput = false;
      }
      // If the user types something for the first time, add a new task
      if (val && !params.createHasInput) {
        $scope.todos.push({ task: val, isCompleted: false });
        params.createHasInput = true;
      }
      // If something was already entered into the textbox but the user 
      // typed more, simply update the last entry
      else if (val && params.createHasInput) {
        $scope.todos[$scope.todos.length - 1].task = val;
      }
    }

    return {
      getTasks,
      createTask,
      updateTask,
      deleteTask,
      watchCreateTaskInput
    };
  });

export default todoFactory;
