angular .module('app')
		.controller('course', ['$rootScope', '$scope', '$http', 'appConfig',
		function($rootScope, $scope, $http, appConfig){
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('addCourse', ['$scope', 'httpAdd', '$modal',
		function($scope, httpAdd, $modal){
			$scope.addCourse = function(course){
				httpAdd.httpFn('courses', course, function(status){
					if(200 === status){
						// $modal.open('sm');
					}
				})

			}
		}])
		.controller('editCourse', ['$scope', '$stateParams', '$http', 'appConfig', 'httpFac',
		function($scope, $stateParams, $http, appConfig, httpFac){
			$scope._id = $stateParams.courseId;
			httpFac.httpFn('courses', 'get', $scope.courseId, function(result){
				$scope.courseTitle = result.title;
			})
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			};

			$scope.update = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id},
						{typeMethod: 'put'}
					];
				return arrParams;
			};
		}])
		.controller('listCourse', ['$scope', 'appConfig', function($scope, appConfig){
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('addSession', ['$scope', 'httpAdd', '$modal', '$stateParams', 'httpFac', 'modalFac',
		function($scope, httpAdd, $modal, $stateParams, httpFac, modalFac){
			$scope.courseId = $stateParams.courseId;
			httpFac.httpFn('courses', 'get', $scope.courseId, function(result){
				$scope.session = {};
				$scope.courseTitle = result.title;
				$scope.session.courseID = result.id;
			})
			$scope.addSession = function(session){
				httpAdd.httpFn('chapters', session, function(status){
					if(200 === status){
						// $scope.open();
					}
				})

			}
		}])
		.controller('editSession', ['$scope', '$stateParams', 'getFieldFac', 'appConfig',
			function($scope, $stateParams, getFieldFac, appConfig){
			$scope._id = $stateParams.sessionId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/chapters/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			};

			$scope.update = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/chapters/'+$scope._id},
						{typeMethod: 'put'}
					];
				return arrParams;
			};
		}])
		.controller('sessionOfCourse', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id+'/chapters'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('managerUserCourse', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id+'/users'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('invoice', ['$scope', 'appConfig',
		function($scope, appConfig){
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/users'},
						{typeMethod: 'get'},
						{filterInclude: '?filter[include]=bills'}
					];
				return arrParams;
			}
		}])
		.controller('editInvoice', ['$scope, $stateParams',
		function($scope, $stateParams){
			$scope._id = $stateParams.invoiceId;
			$scope.getById = function(arr, id){
				var count = arr.length,
					data = [];
				for(var i=0; i<count; i++){
					if(arr[i].id_course === id){
						data.push(arr[i]);
					}
				}
				return data;
			}
		}])
		.controller('session', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id+'/chapters'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('billOfCourse', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			console.log('billOfCourse 1');
			$scope.test = function(){
				console.log('billOfCourse');
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id+'/bills'},
						{typeMethod: 'get'},
						{filterInclude: '?filter[include]=user'}
					];
				return arrParams;
			}
		}])
		.controller('userProfile', ['$scope', '$stateParams', function($scope, $stateParams){
			$scope._id = $stateParams.courseId;
			$scope._id = '574301';
			$scope.getById = function(arr, id){
				var count = arr.length,
					data = [];
				for(var i=0; i<count; i++){
					if(arr[i].id === id){
						data.push(arr[i]);
					}
				}
				return data;
			}
		}])
		.controller('userInvoice', ['$scope', 'httpFac', function($scope, httpFac){

		}])
		.controller('delSession', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id+'/sessions'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		// delete button
		.controller('managerUser', ['$scope', 'appConfig', function($scope, appConfig){
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/users'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
			$scope.items = ['item1', 'item2', 'item3'];
			$scope.open = function (size) {
				var modalInstance = $modal.open({
					templateUrl: 'myModalContent.html',
					controller: 'ModalInstanceCtrl',
					size: size,
					resolve: {
						items: function () {
							return $scope.items;
						}
					}
				});

				modalInstance.result.then(function (selectedItem) {
					$scope.selected = selectedItem;
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
		}])
		.controller('addUser', ['$scope', '$modal', 'httpAdd',
		function($scope, $modal, httpAdd){
			$scope.sexs = [{id: 0, value: 'Nam'}, {id: 1, value: 'Nữ'}];
			$scope.add_users = {sex: 'Nam'};

			$scope.addUser = function(user){
				console.log(user);
				if(user.password !== user.userPassConfirm){
					$scope.massageError = 'Nhắc lại mật khẩu không khớp';
				}else{
					console.log('httpAdd.httpFn')
					httpAdd.httpFn('users', user, function(result){
						console.log('httpAdd.httpFn2')
						console.log('result add_user: ', result);
						if(result === 200){
							$scope.messages = 'Thêm mới thành công';
							var modalInstance = $modal.open({
								templateUrl: 'myModalContent.html',
								controller: 'ModalInstanceCtrl',
								size: 'sm',
								resolve: {
									messages: function () {
										return $scope.messages = 'Thêm mới thành công';
									}
								}
							});

							modalInstance.result.then(function (selectedItem) {
								console.log('ok: ', selectedItem);
								$scope.add_user = '';
							}, function () {
								console.log('cancel');
								$state.go('app.login');
							});
						}else{
							$scope.managerSession = 'Không thể thêm mới user, có lỗi xảy ra';
						}
					})
				}
			}
		}])
		.controller('viewUser', function($scope, $rootScope){
			console.log($rootScope.id);
		})
		.controller('viewCourse', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.courseId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('viewSession',['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.sessionId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/chapters/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('login', ['$scope', '$state', 'auth', 'appConfig',
		function($scope, $state, auth, appConfig){
			$scope.userLogin = function(user){
				auth.login(user, function(data){
					console.log('data login: ', data);
					if(data === 200){
						console.log('true 200');
						$state.go('app.courses');
					}else{
						$scope.massageError = 'Tài khoản hoặc mật khẩu không đúng !';
					}
				})
			}
		}])
		.controller('register', ['$scope', 'httpAdd', '$modal',
		function($scope, httpAdd, $modal){
			$scope.sexs = [{id: 0, value: 'Nam'}, {id: 1, value: 'Nữ'}];
			$scope.add_users = {sex: 'Nam'};
			$scope.registerFn = function(user){
				console.log(user);
				if(user.password !== user.userPassConfirm){
					$scope.massageError = 'Nhắc lại mật khẩu không khớp';
				}else{
					console.log('httpAdd.httpFn')
					httpAdd.httpFn('users', user, function(result){
						console.log('httpAdd.httpFn2')
						console.log('result register: ', result);
						if(result === 200){
							$scope.messages = 'Đăng lý thành công';
							var modalInstance = $modal.open({
								templateUrl: 'myModalContent.html',
								controller: 'ModalInstanceCtrl',
								size: 'sm',
								resolve: {
									messages: function () {
										return $scope.messages = 'Đăng lý thành công';
									}
								}
							});

							modalInstance.result.then(function (selectedItem) {
								console.log('ok: ', selectedItem);
								$state.go('app.login');
							}, function () {
								console.log('cancel');
							});
						}else{
							$scope.managerSession = 'Lỗi đăng ký';
						}
					})
				}
			}
		}])
		.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $state, messages) {
			$scope.message = messages;
			$scope.ok = function () {
				$modalInstance.close($scope.message);
			};
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		})
;