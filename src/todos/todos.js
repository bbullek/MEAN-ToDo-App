// File: todos.js
// Updated January 2017

import _ from 'lodash'; // Library that incl. utility for simpler method binding

export default function($scope, todoFactory) {
  let params = {
    createHasInput: false
  };

  $scope.todos = [];

  todoFactory.getTasks($scope); // Pull the todo's saved to the database

  /****************** Bind methods to our todoFactory module ******************/

  const { createTask, updateTask, deleteTask, watchCreateTaskInput } = todoFactory;

  $scope.createTask = _.partial(createTask, $scope, params);
  $scope.updateTask = _.partial(updateTask, $scope);
  $scope.deleteTask = _.partial(deleteTask, $scope);
  $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput,
    $scope, params));

  /****************************** Event Handlers ******************************/

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
}
