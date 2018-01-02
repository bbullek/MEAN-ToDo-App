// File: index.js
// Updated December 2017

import angular from 'angular';
import appModule from 'config'; // Import our Angular app from config.js
import 'css/master.scss'; // SASS styling

angular.bootstrap(document, [appModule.name]);