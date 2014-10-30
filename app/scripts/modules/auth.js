angular .module('auth', [])
		.factory('$auth',
		['$resource', '$http', '$cookieStore', '$rootScope', '$q', 'localStorageService',
        function ($resource, $http, $cookieStore, $rootScope, $q, localStorageService) {
            var _userKey = 'user',
            	_tokenKey = 'token',
            	_lastLoginNameKey = 'lastLoginName',
            	_authorizationKey = 'Authorization';
            var _setHeaderToken = function (token) {
                $http.defaults.headers.common[_authorizationKey] = token;
            };
            var _clearHeaderToken = function () {
                $http.defaults.headers.common[_authorizationKey] = null;
            };
            return {
                pendingStateChange: null,
                clearCurrentUser: function () {
                    this.clearUser();
                },

                setCurrentUser: function (user) {
                    this.setUser(user);
                },
                getCurrentUser: function () {
                    var user = this.getUser();
                    var userRole = this.getUserRole();
                    if (user && userRole) {
                        if (userRole.title === 'admin' || userRole.title === 'manager') {
                            user.nextState = 'nodejs.admin';
                        }
                        if (userRole.title === 'user') {
                            user.nextState = 'nodejs.main.home';
                        }
                        if (userRole.title === 'kitchen' || userRole.title === 'bar') {
                            user.nextState = 'bell.monitor-bar.monitor';
                        }
                    }
                    return user;
                },
                clearUser: function () {
                    localStorageService.remove(_userKey);
                },
                setUser: function (user) {
                    localStorageService.set(_userKey, JSON.stringify(user));
                },
                getUser: function () {
                    var cachedUser = localStorageService.get(_userKey);
                    if (!!cachedUser) {
                        return cachedUser;
                    }
                    return null;
                },
                setToken: function (token) {
                    if (token) {
                        _setHeaderToken(token);
                        localStorageService.set(_tokenKey, token);
                    } else {
                        _setHeaderToken(null);
                        localStorageService.set(_tokenKey, null);
                    }
                },
                restrictToken: function () {
                    var me = this;
                    var token = me.getToken();
                    if(token){
                    }
                },
                getToken: function () {
                    return localStorageService.get(_tokenKey);
                },

                clearToken: function () {
                    _clearHeaderToken();
                    localStorageService.set(_tokenKey, null);
                },

                setHeaderToken: function () {
                    var token = this.getToken();
                    if (token) {
                        _setHeaderToken(token);
                    } else {
                        _setHeaderToken(null);
                    }
                    $logger.info('setHeaderToken', 'done', true);
                },
                getHeaderToken: function () {
                    var token = $http.defaults.headers.common[_authorizationKey];
                    if (token) {
                        return token;
                    } else {
                        return null;
                    }
                },
                resolvePendingState: function (httpPromise) {
                    var _functionName = 'resolvePendingState';
                    var checkUser = $q.defer();
                    var me = this;
                    var pendingState = me.pendingStateChange;

                    httpPromise
                        .success(function (data) {
                            if (data.success) {
                                me.setCurrentUser(data.user);
                                if (pendingState.to.accessLevel === undefined || me.authorize(pendingState.to.accessLevel)) {
                                    checkUser.resolve();
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
                register: function (data, cb) {
                    var me = this;
                    var registerData = {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        sex: data.sex,
                        firstname: data.firstname,
                        lastname: data.lastname
                    };
                    $http(
                        {
                            'method': 'POST',
                            'data': registerData,
                            'url': appConfig.apiHost + '/register'
                        })
                        .success(function (data) {
                            cb(null, data);
                        })
                        .error(function (err) {
                            cb(err, null);
                        });
                },
                getUserInfoById: function (id, cb) {
                    $restful.get({table: 'Users', id: id}, function (resp) {
                        if (resp.success) {
                            cb(null, resp.data);
                        } else {
                            cb(resp.message, null);
                        }
                    });
                },
                login: function (username, password, cb) {
                    var me = this;
                    $rootScope.crudProcessing = true;
                    $http(
                        {
                            'method': 'POST',
                            'data': {'username': username, 'password': password},
                            'url': appConfig.apiHost + '/managerLogin'
                        })
                        .success(function (data) { //.success(function(data, status, headers, config)
                            console.log('Log: ',data.user);
                            var user = data.user;
                            var token = data.token;
                            me.setCurrentUser(user);
                            me.setToken(token);
                            me.setLastLoginName();
                            me.pendingStateChange = null;
                            cb(null, data);
                        })
                        .error(function (err) {
                            $rootScope.crudProcessing = false;
                            $rootScope.loginError = err;
                            cb(err, null);
                        });
                },

                logout: function (callBack) {
                    var me = this;
                    $rootScope.logoutProcessing = true;
                    $http(
                        {
                            'method': 'POST',
                            'url': appConfig.apiHost + '/logout'
                        })
                        .success(function (data) {
                            me.clearCurrentUser();
                            me.clearToken();
                            if (window.socketIo) {
                                window.socketIo.disconnect();
                            }
                            $rootScope.logoutProcessing = false;
                            callBack(true);
                        })
                        .error(function (err) {
                            $rootScope.logoutProcessing = false;
                            callBack(false);
                        });
                },

                setLastLoginName: function () {
                    localStorageService.set(_lastLoginNameKey, this.getUserName());
                },

                getLastLoginName: function () {
                    return localStorageService.get(_lastLoginNameKey);
                },

                getUserId: function () {
                    var user = this.getUser();
                    if (!!user) {
                        return user.id;
                    }
                    return '';
                },

                getUserName: function () {
                    var user = this.getUser();
                    if (!!user) {
                        return user.name;
                    }
                    return '';
                },

                getUserFullName: function () {
                    var user = this.getUser();
                    if (!!user) {
                        return user.fullname;
                    }
                    return '';
                },

                getUserRole: function () {
                    var user = this.getUser();
                    if (!!user) {
                        return user.role;
                    }
                    return null;
                },

                getUserSite: function () {
                    var user = this.getUser();
                    if (!!user && user.site) {
                        return user.site;
                    }
                    return null;
                },

                authorize: function (accessLevel) {
                    var userRole = this.getUserRole();
                    if (null !== userRole) {
                        var result = accessLevel.bitMask <= userRole.bitMask;
                        return result;
                    } else {
                        return false;
                    }
                },
                isLogin: function () {
                    var userRole = this.getUserRole();
                    return (userRole) ? true : false;
                }

            };
        }]);