'use strict';

/**
 * @ngdoc function
 * @name labApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the labApp
 */
angular.module('labApp')
  .controller('MainCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.isCollapsed = true;
  }]);
