angular .module('btnDelete', ['ionic'])
		.directive('buttonDelete', [function(){
			return {
				link: function(scope, element, attrs){

				},
				controller: function($scope, $ionicPopup){
					$scope.confirmDel = function() {
						var confirmPopup = $ionicPopup.confirm({
							title: 'Consume Ice Cream',
							template: 'Are you sure you want to eat this ice cream?'
						});
						confirmPopup.then(function(res) {
							if(res) {
								console.log('You are sure');
							} else {
								console.log('You are not sure');
							}
						});
					};
				},
				template: '<a href="javascript:;" class="btn-icon bg-success" ng-click="confirmDel()"><i class="glyphicon glyphicon-trash"></i></a>'
			}
		}])