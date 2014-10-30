(function() {
  	'use strict';
	angular .module('app.user.profile', [])
			.controller('profileCtr', ['$scope', function($scope){
				$scope.name = "Nguyen Minh Quang";
				console.log('quang');
			}]);
}).call(this);