// File: todos.js
// Updated December 2017

export default function($scope) {
  let params = {
    createHasInput: false
  };

  $scope.todos = [
    {
      task: 'do dishes',
      isCompleted: false
    },
    {
      task: 'walk the dog',
      isCompleted: true
    }
  ];

  $scope.onCompletedClick = function(todo) {
    todo.isCompleted = !todo.isCompleted;
  };

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
}
