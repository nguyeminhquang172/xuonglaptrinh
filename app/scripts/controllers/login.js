angular .module('app')
		.controller('login', ['$scope', '$http', function($scope, $http){
			$scope.loginFn = function(data){
				var email = data.email,
					password = data.password;
				$http({
					method: 'GET',
					url: 'http://localhost:9000/data/users.json'
				})
				.success(function(data){

				})
			}
		}])