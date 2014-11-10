'use strict';

/**
 * @ngdoc function
 * @name labApp.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the labApp
 */
angular.module('labApp')
    .controller('HomeCtrl',['$scope', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.messages = [
            {
                name: 'Hello world'
            },
            {
                name: 'i love javascript!!!'
            }

        ];

        $scope.addText = function() {
            $scope.messages.unshift({
                name: $scope.itemContent
            });
            $scope.itemContent = '';
        }



    }]);
