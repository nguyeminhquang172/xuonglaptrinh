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
		.controller('addCourse', ['$scope', 'httpAdd', '$modal', 'modalFac',
		function($scope, httpAdd, $modal, modalFac){
			$scope.courseStatus = [{status: 'Online'}, {status: 'Offline'}];
			$scope.course = {};
			$scope.course.location = $scope.courseStatus[1];
			$scope.addCourse = function(course){
				httpAdd.httpFn('courses', course,
				function(status){
					if(200 === status){
						modalFac.modalOpen('Thêm khóa học thành công')
					}
				})

			}
		}])
		.controller('editCourse', ['$scope', '$stateParams', '$http', 'appConfig', 'httpFac',
		function($scope, $stateParams, $http, appConfig, httpFac){
			$scope._id = $stateParams.courseId;
			console.log('courses id: ', $scope._id);
			/*httpFac.httpFn('courses', 'get', $scope.courseId, function(result){
				$scope.courseTitle = result.title;
			})*/
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
/*		.controller('listCourse', ['$scope', 'appConfig', function($scope, appConfig){
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/courses'},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])*/
		.controller('addSession', ['$scope', 'httpAdd', '$modal', '$stateParams', 'httpFac', 'modalFac', 'status', 'modalFac',
		function($scope, httpAdd, $modal, $stateParams, httpFac, modalFac, status, modalFac){
			$scope.courseId = $stateParams.courseId;

			$scope.status = status.status;
			$scope.session = {};
			$scope.session.practice = {};
			$scope.session.slide = {};
			$scope.session.practice.status =$scope.status[1]
			$scope.session.slide.status =$scope.status[1]

			httpFac.httpFn('courses', 'get', $scope.courseId, function(result){
				$scope.session = {};
				$scope.courseTitle = result.title;
				$scope.session.courseID = result.id;
			})
			$scope.addSession = function(session){
				httpAdd.httpFn('chapters', session, function(status){
					if(200 === status){
						modalFac.modalOpen('Thêm chapter thành công');
					}else{
						modalFac.modalOpen('Có lỗi xảy ra');
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
						{urlApi: appConfig.apiHost+'/user_courses/'+'?filter[where][courseID]='+$scope._id+'&filter[include]=users'},
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
/*		.controller('viewInvoice', ['$scope, $stateParams',
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
		}])*/
		.controller('editBill', ['$scope', '$stateParams', 'appConfig',
		function($scope, $stateParams, appConfig){
			$scope._id = $stateParams.billId;
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/bills/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			};

			$scope.update = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/bills/'+$scope._id},
						{typeMethod: 'put'}
					];
				return arrParams;
			};
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
		.controller('userProfile', ['$scope', '$stateParams', 'User', 'appConfig',
		function($scope, $stateParams, User, appConfig){
			$scope._id = User.getCurrentId();
			console.log('getCurrentId: ', $scope._id);
			$scope.test = function(){
				console.log('getCurrentId');
				var arrParams = [
						{urlApi: appConfig.apiHost+'/users/'+$scope._id},
						{typeMethod: 'get'}
					];
				return arrParams;
			}
		}])
		.controller('changePass', ['$scope', 'httpFac', 'User', 'modalFac',
		function($scope, httpFac, User, modalFac){
			$scope.changePass = function(user){
				var userID = User.getCurrentId();
				httpFac.httpFn('users', 'get', userID, function(data){
					console.log('changePass: ', data);
					if(data.email === user.email){
						httpFac.httpUpdate('users', 'put', userID, user, function(result){
							if(result == 200){
								modalFac.modalOpen('Đổi mật khẩu thành công');
							}else{
								modalFac.modalOpen('Đã có lỗi xảy ra');
							}
						})
					}else{
						modalFac.modalOpen('Email này chưa đăng ký');
					}
				})
			}
		}])
		.controller('userInvoice', ['$scope', '$stateParams', 'User', 'appConfig',
		function($scope, $stateParams, User, appConfig){
			$scope._id = User.getCurrentId();
			$scope.test = function(){
				var arrParams = [
						{urlApi: appConfig.apiHost+'/users/'+$scope._id+'/bills'},
						{typeMethod: 'get'},
						{filterInclude: '?filter[include]=course'}
					];
				return arrParams;
			}
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
		.controller('addUser', ['$scope', '$modal', 'httpAdd', 'modalFac',
		function($scope, $modal, httpAdd, modalFac){
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
							modalFac.modalOpen('Thêm user thành công');
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
		.controller('register', ['$scope', 'httpAdd', '$modal', '$state', 'modalFac',
		function($scope, httpAdd, $modal, $state, modalFac){

			$scope.sexs = [{value: 'Nam'}, {value: 'Nữ'}];
			$scope.users = {};
			$scope.users.sex = $scope.sexs[0];
			console.log('users.sex: ', $scope.users.sex);
			$scope.registerFn = function(user){
				var sex = user.sex.value;
					user.sex = sex;
				console.log(user);
				if(user.password !== user.userPassConfirm){
					$scope.massageError = 'Nhắc lại mật khẩu không khớp';
				}else{
					httpAdd.httpFn('users', user, function(result){
						console.log('result register: ', result);
						if(result === 200){
							modalFac.modalOpen('Đăng ký thành công');
						}else{
							$scope.managerSession = 'Lỗi đăng ký';
						}
					})
				}
			}
		}])
		.controller('ModalInstanceCtrl',['$window', '$scope', '$modalInstance', '$state', 'messages',
		function ($window, $scope, $modalInstance, $state, messages) {
			$scope.message = messages;
			$scope.ok = function (agr) {
				console.log('agr : ', agr);
				if(agr == 'back'){
					$window.history.back();
				}else if(!agr){

				}
				else{
					$state.go(agr);
				}
				$modalInstance.close($scope.message);
			};
			$scope.cancel = function (agr) {
				console.log('cancel agr');
				$modalInstance.dismiss('cancel');
			};
		}])
;