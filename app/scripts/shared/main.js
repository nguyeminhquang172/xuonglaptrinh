(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', function($scope, $rootScope) {
      var $window;
      $window = $(window);
      /*$scope.main = {
        name: 'Nguyen MInh Quang'
      }*/
      $scope.abd = 'name abd';
      console.log('app.controllers');
      $scope.pageTransitionOpts = [
        {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }, {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: true,
        pageTransition: $scope.pageTransitionOpts[0]
      };
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
      return $scope.color = {
        primary: '#248AAF',
        success: '#3CBC8D',
        info: '#29B7D3',
        infoAlt: '#666699',
        warning: '#FAC552',
        danger: '#E9422E'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}])
.controller('NavCtrl', ['$scope', function($scope) {console.log('main 2');}])
.controller('NavContainerCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      console.log('main');
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {console.log('DashboardCtrl');}])
  .controller('test', ['$scope', function($scope){console.log(2);}]);

}).call(this);

