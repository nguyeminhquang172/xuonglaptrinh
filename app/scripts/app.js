// Generated by CoffeeScript 1.7.1
  'use strict';
  angular.module('app',
    [
      'ngRoute', 'ngAnimate', 'ui.bootstrap', 'app.controllers', 'app.localization',
      'app.nav', 'app.ui.form.ctrls', 'ui.router', 'LocalStorageModule',
    ])
    .constant('appConfig', {
      apiHost: 'http://vsoft.vn:8888/api'
    })
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
      function($stateProvider, $urlRouterProvider, $httpProvider){

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $stateProvider
          .state('app', {
            url: '',
            views: {
              "header": { templateUrl: 'views/header.html' },
              "navbar": { templateUrl: 'views/nav.html' },
              "mainContain": { templateUrl: 'views/main.html' }
            },
            accessLevel: window.userCan.accessUser
          })
          .state('app.main', {
            url: '/main',
            views: {
              'contenView': {
                controller: 'DashboardCtrl',
                // templateUrl: 'views/learning/board.html'
              }
            },
            accessLevel: window.userCan.accessUser
          })
          .state('app.board', {
            url: '/learning/board.html',
            templateUrl: 'views/learning/board.html',
          })
          .state('app.invoices', {
            url: '/user/invoice',
            views:{
              'contenView': {
                templateUrl: 'views/user/invoice.html'
              }
            },
            accessLevel: window.userCan.accessUser
          })
          .state('app.courses', {
            url: '/courses',
            views: {
              'contenView': {
                templateUrl: 'views/courses/course.html',
                controller: 'course'
              }
            }
          })
          .state('app.register', {
            url: '/register',
            views: {
              'contenView':{
                controller: 'register',
                templateUrl: 'views/register.html'
              }
            }
          })
          .state('app.editCourse', {
            url: '/manager/course/edit/:courseId.html',
            views: {
              'contenView':{
                controller: 'editCourse',
                templateUrl: 'views/manager/courses/edit.html'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.editSession', {
            url: '/manager/session/edit/:sessionId.html',
            views: {
              'contenView': {
                controller: 'editSession',
                templateUrl: 'views/manager/sessions/edit.html'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.session', {
            url: '/course/:courseId.html',
            views: {
              'contenView': {
                controller: 'session',
                templateUrl: 'views/courses/sessions.html'
              }
            },
            // accessLevel: window.userCan.accessUser
          })
          .state('app.managerCourse', {
            url: '/manager/courses',
            views: {
              'contenView': {
                controller: 'course',
                templateUrl: 'views/manager/courses/lists.html'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.managerInvoice', {
            url: '/manager/invoices',
            views: {
              'contenView': {
                templateUrl: 'views/manager/invoices/lists.html'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.managerSession', {
            url: '/manager/:courseId/sessions',
            views: {
              'contenView': {
                controller: 'sessionOfCourse',
                templateUrl: 'views/manager/sessions/lists.html'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.viewCourse', {
            url: '/manager/course/view/:courseId.html:',
            views: {
              'contenView': {
                controller: 'viewCourse',
                templateUrl: 'views/manager/courses/course-detail.html',
              }
            }
          })
          .state('app.viewSession', {
            url: '/manager/session/view/:sessionId.html:',
            views: {
              'contenView': {
                controller: 'viewSession',
                templateUrl: 'views/manager/sessions/session-detail.html',
              }
            }
          })
          .state('app.editInvoice', {
            url: '/manager/invoice/view/:invoiceId.html:',
            views: {
              'contenView': {
                controller: 'editInvoice',
                templateUrl: 'views/manager/invoices/invoice-detail.html',
              }
            },
            accessLevel: window.userCan.accessManager
          })
          /*.state('app.sessions', {
            url: '/manager/sessions',
            views: {
              'contenView': {
                templateUrl: 'views/manager/sessions/lists.html'
              }
            },
            // accessLevel: window.userCan.accessManager
          })*/
          .state('app.managerUser', {
            url: '/manager/users',
            views: {
              'contenView': {
                templateUrl: 'views/manager/users/lists.html',
                controller: 'managerUser'
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.addUser', {
            url: '/manager/user/add',
            views: {
              'contenView': {
                templateUrl: 'views/manager/users/templates/add.html',
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.addCourse', {
            url: '/manager/courses/add',
            views: {
              'contenView': {
                controller: 'addCourse',
                templateUrl: 'views/manager/addCourse.html',
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.addSession', {
            url: '/manager/:courseId/session/add.html',
            views: {
              'contenView': {
                controller: 'addSession',
                templateUrl: 'views/manager/sessions/templates/add.html',
              }
            },
            accessLevel: window.userCan.accessManager
          })
          .state('app.profile', {
            url: '/user/profile',
            views: {
              'contenView': {
                templateUrl: 'views/user/profile.html',
                controller: 'userProfile'
              }
            }
          })
/*          .state('managerUserInvoice', {
            url: '/manager/user/invoice',
            views: {
              'contenView': {
                templateUrl: 'views/user/invoices.html',
              }
            }
          })*/
          .state('app.login', {
            url: '/login',
            views: {
              'contenView': {
                controller: 'login',
                templateUrl: 'views/pages/signin.html'
              }
            }
          })
          .state('app.changePass', {
            url: '/user/change-password',
            views: {
              'contenView': {
                templateUrl: 'views/pages/change-password.html'
              }
            },
            accessLevel: window.userCan.accessUser
          })
          .state('app.forgotPass', {
            url: '/forgot-password',
            views: {
              'contenView': {
                templateUrl: 'views/pages/forgot-password.html'
              }
            }
          })
          ;
          $urlRouterProvider.otherwise('/learning/board.html')
      }
    ])
  .run(['$rootScope', '$state', '$location', 'auth',
  function($rootScope, $state, $location, auth){
    $rootScope.$on('$stateChangeStart', function (event, to, toParams, fromState, from) {
      console.log('fds: ', auth.getLocalToken());
        if (auth.getLocalToken() === null) {
          console.log('not token');
            auth.pendingStateChange = {
                to: to,
                toParams: toParams
            };
        }else{
          console.log('to: ', to);
          console.log('fromState: ', fromState);
          if(to.url === '/login'){
            console.log('fdsafdsa')
            $rootScope.goToState('app.courses');
          }
        }
        if (to.accessLevel === undefined || auth.authorize(to.accessLevel)) {
            console.log('access level :', true);
        } else {
            console.log('access level :', false);
            event.preventDefault();
            $state.go('app.login');
        }
        $rootScope.userInfo = auth.getLocalUserInfo();
    });
    $rootScope.goToState = function(state){
      $state.go(state);
    };
    $rootScope.isLogined = function(){
      return auth.isLogin();
    };
    $rootScope.isManager = function(){
      return (auth.isLogin() && auth.manager()) ? true : false;
    };
    $rootScope.logout = function(){
      auth.clearHeaderToken();
      auth.clearLocalUserInfo();
      $rootScope.goToState('app.main');
    };
  }])
  .factory('getFieldFac', ['$http', '$q', function($http, $q){
    var defer = $q.defer();
    return {
      getField: function(){
        var data = [{course1:'nodejs'}, {course2: 'angular'}];
        $http({
          method: 'get',
          url: 'http://vsoft.vn:8888/api/courses'
        })
        .success(function(result){
          console.log('result :', result);
          defer.resolve(result);
        })
        .error(function(err){
          console.log('err 2: ', err);
          defer.reject(err);
        });
        return defer.promise;
      }
    }
  }])
  .factory('httpFac', ['$http', 'appConfig', function($http, appConfig){
    return {
      httpFn: function(_table, _method, _id, callBack){
        $http({
          url: appConfig.apiHost+'/'+_table+'/'+_id,
          method: _method
        })
        .success(function(data){
          console.log('delete success: ', data);
          console.log('url : ', appConfig.apiHost+'/'+_table+'/'+_id);
          callBack(data);
        },
        function(error){
          console.log('delete error: ', error);
          callBack(error);
        });
      },
      httpUpdate: function(_table, _method, _id, _data, callBack){
        $http({
          url: appConfig.apiHost+'/'+_table+'/'+_id,
          method: _method,
          data: _data
        })
        .success(function(status){
          callBack(status);
        }, function(error){
          callBack(error);
        });
      }
    }
  }])
  .factory('httpAdd', ['$http', 'appConfig', function($http, appConfig){
    return {
      httpFn: function(_table, _data, callBack){
        console.log('httpAdd', _data);
        var urlApi = appConfig.apiHost+'/'+_table;
        console.log('api register : ', urlApi);
        console.log('data register: ', _data);
        $http({
          url: urlApi,
          method: 'post',
          data: _data
        })
        .success(function(data, status){
          console.log('data 2: ', data);
          console.log('status: ', status);
          callBack(status);
        }, function(error, status){
          console.log('err registerCourse: ', status);
          console.log('error add: ', error);
          console.log(status);
        })
      }
    }
  }])
  .factory('modalFac', ['$modal', function($modal){
      return {
        open:function () {
          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm'
          });

          modalInstance.result.then(function (selectedItem) {
            console.log('ok')
          }, function () {
            console.log('cancel');
          });
        }
      }
  }])
  .factory('auth',['$http', 'localStorageService', 'appConfig',
  function($http, localStorageService, appConfig){
    var _token = 'token',
        _userId = 'id',
        _userInfo = 'userInfo',
        _role = 'role',
        _authorizationKey = 'authorization',
        _courseID = 'courseID',
        _setHeaderToken = function(token){
          $http.defaults.headers.common[_authorizationKey] = token;
        },
        _clearHeaderToken = function(){
          $http.defaults.headers.common[_authorizationKey] = null;
        };
    return {
      getHeaderToken: function(){
        var token = $http.defaults.headers.common[_authorizationKey];
        token ? token = token : token = null;
        return token;
      },
      setHeaderToken: function(){
        var token = this.getLocalToken();
        $http.defaults.headers.common[_authorizationKey] = token;
      },
      clearHeaderToken: function(){
        this.clearLocalRole();
        this.clearLocalToken();
      },
      setLocalToken: function(token){
        localStorageService.set(_token, token);
      },
      getLocalToken: function(){
        return localStorageService.get(_token);
      },
      setLocalRole: function(role){
        localStorageService.set(_role, role);
      },
      clearLocalRole: function(){
        localStorageService.set(_role, null);
      },
      clearLocalToken: function(){
        localStorageService.set(_token, null);
      },
      getLocalRole: function(){
        return localStorageService.get(_role)
      },
      setLocalUserInfo: function(user){
        localStorageService.set(_userInfo, user);
      },
      getLocalUserInfo: function(){
        return localStorageService.get(_userInfo);
      },
      clearLocalUserInfo: function(){
        localStorageService.set(_userInfo, null);
      },
      isLogin: function(){
        return this.getLocalToken() ? true : false
      },
      manager: function(){
        return this.getLocalRole() > 1 ? true : false;
      },
      pendingStateChange: null,
      resolvePendingState: function (httpPromise) {
          var checkUser = $q.defer();
          var me = this;
          var pendingState = me.pendingStateChange;
          httpPromise
              .success(function (data) {
                  if (data.success) {
                      me.setUser(data.user);
                      console.log('pendingState.to.accessLevel: ', pendingState.to.accessLevel);
                      if (pendingState.to.accessLevel === undefined || me.authorize(pendingState.to.accessLevel)) {
                          checkUser.resolve();
                          console.log('checkUser.resolve')
                      } else {
                          checkUser.reject('unauthorized'); // may be 403
                      }
                  } else {
                      checkUser.reject('401');
                  }
              })
              .error(function (err, status, headers, config) {
                  checkUser.reject(status.toString());
              });
          me.pendingStateChange = null;
          return checkUser.promise;
      },
      authorize: function (accessLevel) {
        var tokenUser = this.getLocalToken;
        if (null !== tokenUser) {
            var result = accessLevel.bitMask <= this.getLocalRole();
            return result;
        } else {
          console.log('return false');
            return false;
        }
      },
      login: function(user, callBack){
        var _this = this;
        $http({
          url: appConfig.apiHost + '/users/login',
          method: 'post',
          data: user
        })
        .success(function(result, status){
          // role = result.bitMask,
          var token = result.id,
              role = result.role;
          console.log('result login: ', result);
          callBack(status);
          _this.setLocalToken(token);
          _this.setLocalRole(role);
          _this.setLocalUserInfo(result);
        }
        )
        .error(function(error, status){
          console.log('error:', error);
          callBack(status);
        })
      }
    }
  }])
  .directive('dataEmpty', function(){
    return {
      restrict: 'A',
      controller: function($scope){
        $scope.alert = function(){
          alert('data empty');
        }
      }
    }
  })
  .directive('regcourse',[function(){
    return {
      scope: true,
      controller: function(){
        this.dirChild = function(){
          alert('multiple controller');
          console.log('multiple controller');
        }
      }
    }
  }])
  .directive('similarCourse', function(){
      return {
        restrict: 'A',
        scope:{
          sourceApi: '@',
          typeMethod: '@',
          template: '@',
          fields: '@',
          getParam: '&',
          filters: '&',
          updateData: '&',
          id: '@'
        },
        link: function (scope, element, attributes, regcourseCtrl) {
            scope.courseRegister = function(){
              regcourseCtrl.dirChild();
            }
        },
        controller: function($rootScope, $scope, $http, $parse, $modal, $state, $window, getFieldFac, httpFac, auth, localStorageService, appConfig){
          $scope.download = function(_id){
            httpFac.httpFn('chapters','get',_id, function(result){
              if(result.slide.status !== "public"){
                if($rootScope.isLogined()){
                  console.log('getLocalCourseID: ', $scope.getLocalCourseID());
                  console.log('userID: ', $rootScope.userInfo.userId);
                  $http({
                    method: 'get',
                    url: appConfig.apiHost + '/users/' + $rootScope.userInfo.userId + '/accessTokens'
                  })
                  .success(function(data, status){
                    console.log('data token: ', data);
                  })
                }else{
                  $rootScope.goToState('app.login');
                }
              }else{
                console.log('public');
              }
            })
          };
          // console.log($parse($scope.fields)($scope).length);
          // orderBy:
          $scope.order = function(predicate, reverse) {
            $scope.pros = orderBy($scope.pros, predicate, reverse);
          };
          // End orderBy
          var _courseID = 'courseID';
          $scope.setLocalCourseID= function(courseId){
            localStorageService.set(_courseID, courseId);
          };
          $scope.getLocalCourseID= function(){
            return localStorageService.get(_courseID);
          };
          getFieldFac.getField().then(function (data) {
            $scope.listCourse = data;
            console.log('$scope.listCourse: ', $scope.listCourse);
          });
          var urlApi = $scope.sourceApi,
              type = $scope.typeMethod,
              template = $scope.template,
              params = $scope.getParam(),
              paramsUpdate = $scope.updateData(),
              filters = $scope.filters,
              _id = $scope.id;
          $scope.courseId = $scope.id;
              console.log('params get from controller pass attrs: ', params);
              console.log('params update: ', paramsUpdate);
          // Delete button
          // $scope.doc = 'default';
          $scope.open = function (arr,index, id) {
            $scope._index = index;
            $scope.arrData = arr;
            $scope.idDelete = id;
            var modalInstance = $modal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
              scope : $scope,
              size: 'sm'
            });
            modalInstance.result.then(function () {
              $scope.arrData.splice($scope._index, 1);
            }, function () {
              console.log('cancel');
            });
          };

          var ModalInstanceCtrl = function ($scope, $modalInstance, httpFac) {
            $scope.dochange = function (){
              // console.log($scope.doc)
            }
            $scope.ok = function (_table) {
              console.log('ok');
              httpFac.httpFn(_table, 'delete', $scope.idDelete, function(data){
                console.log('delete call : ', data);
              });
              $modalInstance.close($scope.id);
            };
            $scope.cancel = function (back) {
              $modalInstance.dismiss('cancel-fc');
              back ? $window.history.back():'';
            };
          };
          // End Delete button
          $scope.getId = function(id){
            // console.log('id : ', id);
            $rootScope.id = id;
          };
          $scope.editFn = function(data){
            $rootScope.editData = data;
          };
          $scope.update = function(_data){
            console.log('paramsUpdate[0].urlApi: ', paramsUpdate[0].urlApi)
            console.log('paramsUpdate[1].typeMethod: ', paramsUpdate[1].typeMethod);
            $http({
              url: paramsUpdate[0].urlApi,
              method: paramsUpdate[1].typeMethod,
              data: _data
            })
            .success(function(data, status){
              if(status === 200){
                var modalInstance = $modal.open({
                  templateUrl: 'myModalContent.html',
                  controller: ModalInstanceCtrl,
                  scope : $scope,
                  size: 'sm'
                });
                modalInstance.result.then(function () {
                }, function(){
                });
              }
            })
            .error(function(err){
              console.log('update error  : ', err);
            });
          };
          $scope.registerCourse = function(data){
            if($rootScope.isLogined() === false){
              alert('false');
            }else{
              console.log('data registerCourse: ', data);
              console.log($rootScope.userInfo);
            }
          }
          $http({
            url: params[0].urlApi,
            method: params[1].typeMethod
          })
          .success(function(data){
            console.log('data http : ', data);
              $scope.datas = data;
              $scope.data = data;
              $scope.courseName = {};
              $scope.courseName.title = data.courseID;
              console.log('$scope.courseName.title: ', $scope.courseName.title);

              // pagination
            $scope.totalItems = 64;
            $scope.currentPage = 4;
            $scope.setPage = function(pageNo) {
              return $scope.currentPage = pageNo;
            };
            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            return $scope.bigCurrentPage = 1;
          // end pagination
          })
          .error(function(err){
            console.log('err : ', err);
          });
        },
        templateUrl: function(element, attrs){
          /*var btn = angular.element(document.querySelector("#update"));
          btn.bind('click', function(e){
            alert('fd');
          });*/
          var template = attrs["template"];
          return template;
        }
      }
  })
  .directive('dateTimePicker', [function(){
    return {
      restrict: 'E',
      replace: true,
      controller: function($scope){
        $scope.today = function() {
          return $scope.dt = new Date();
        };
        $scope.today();
        $scope.showWeeks = true;
        $scope.toggleWeeks = function() {
          return $scope.showWeeks = !$scope.showWeeks;
        };
        $scope.clear = function() {
          return $scope.dt = null;
        };
        $scope.toggleMin = function() {
          var _ref;
          return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
            "null": new Date()
          };
        };
        $scope.toggleMin();
        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          return $scope.opened = true;
        };
        $scope.dateOptions = {
          'year-format': "'yy'",
          'starting-day': 1
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        return $scope.format = $scope.formats[0];
      },
      template: '<div class="input-group ui-datepicker"> <input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min="minDate" max="2015-06-22" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close"> <span class="input-group-addon" ng-click="open($event)"><i class="fa fa-calendar"></i></span> </div>'
    }
  }])
;


