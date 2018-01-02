// File: todos.js
// Updated December 2017

import _ from 'lodash'; // Functionality for easy removal from todo list

export default function($scope) {
  let params = {
    createHasInput: false
  };

  $scope.todos = [
    {
      task: 'do dishes',
      isCompleted: false,
      isEditing: false
    },
    {
      task: 'walk the dog',
      isCompleted: true,
      isEditing: false
    }
  ];

  /*
   * Decorates the task's text with a strikethrough when the checkbox is 
   * ticked.
   */
  $scope.onCompletedClick = function(todo) {
    todo.isCompleted = !todo.isCompleted;
  };

  /*
   * Shows a textbox where the user can edit a task (triggered by clicking the
   * blue Edit button).
   */
  $scope.onEditClick = function(todo) {
    todo.isEditing = true;
    todo.updatedTask = todo.task;
  }

  /*
   * Exits editing mode when the user clicks the Cancel button.
   */
  $scope.onCancelClick = function(todo) {
    todo.isEditing = false;
  }

  /*
   * Monitor the textbox to append new tasks as they are added.
   */
  $scope.$watch('createTaskInput', function(val) {
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
  });

  /*
   * Saves the task to the todo list when the green 'Create Task' button is 
   * clicked or when the user hits enter.
   */
  $scope.createTask = function() {
    params.createHasInput = false;
    $scope.createTaskInput = ''; // Clear the textbox
  };

  /*
   * Updates the task's name after the user has typed a new string via the Edit
   * button.
   */
  $scope.updateTask = function(todo) {
    todo.task = todo.updatedTask;
    todo.isEditing = false;
  };

  /*
   * Removes the task from the user's todo list when they click the Delte 
   * button.
   */
  $scope.deleteTask = function(todoToDelete) {
    // Use lodash to remove the given todo from the list
    _.remove($scope.todos, todo => todo.task === todoToDelete.task); 
  }
}
