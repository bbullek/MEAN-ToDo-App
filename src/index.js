// File: index.js
// December 2017

import angular from 'angular';
import appModule from 'config'; // Import our Angular app from config.js

angular.bootstrap(document, [appModule.name]);