// File: todos-factory.js
// Updated January 2017

import angular from 'angular';
import _ from 'lodash'; // Library that incl. utility to easily remove from array

const todoFactory = angular.module('app.todoFactory', [])

  .factory('todoFactory', () => {

    /*
     * Saves the task to the todo list when the green 'Create Task' button is 
     * clicked or when the user hits enter.
     */
    function createTask($scope, params) {
      params.createHasInput = false;
      $scope.createTaskInput = ''; // Clear the textbox
    }

    /*
     * Updates the task's name after the user has typed a new string via the Edit
     * button.
     */
   function updateTask(todo) {
      todo.task = todo.updatedTask;
      todo.isEditing = false;
    };

    /*
     * Removes the task from the user's todo list when they click the Delete 
     * button.
     */
    function deleteTask($scope, todoToDelete) {
      // Use lodash to remove the given todo from the list
      _.remove($scope.todos, todo => todo.task === todoToDelete.task); 
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
      createTask,
      updateTask,
      deleteTask,
      watchCreateTaskInput
    };
  });

export default todoFactory;
