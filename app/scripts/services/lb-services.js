(function (window, angular, undefined) {
    'use strict';

    var urlBase = "http://vsoft.vn:8888/api/";
    var module = angular.module("lbServices", ['ngResource']);

    module.factory(
        "User",
        ['LoopBackResource','LoopBackAuth', '$injector', function (Resource, LoopBackAuth, $injector) {
            var R = Resource(
                    urlBase + "/Users/:id",
                { 'id': '@id' },
                {

                    "login": {
                        url: urlBase + "/Users/login",
                        method: "POST",
                        params: {
                            include: "user"
                        },
                        interceptor: {
                            response: function (response) {
                                var accessToken = response.data;
                                LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
                                LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
                                LoopBackAuth.save();
                                return response.resource;
                            }
                        }
                    },

                    "logout": {
                        url: urlBase + "/Users/logout",
                        method: "POST",
                        interceptor: {
                            response: function (response) {
                                LoopBackAuth.clearUser();
                                LoopBackAuth.save();
                                return response.resource;
                            }
                        }
                    },


                    "confirm": {
                        url: urlBase + "/Users/confirm",
                        method: "GET"
                    },

                    "resetPassword": {
                        url: urlBase + "/Users/reset",
                        method: "POST"
                    },


                    "prototype$__findById__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens/:fk",
                        method: "GET"
                    },


                    "prototype$__destroyById__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens/:fk",
                        method: "DELETE"
                    },


                    "prototype$__updateById__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens/:fk",
                        method: "PUT"
                    },

                    "prototype$__get__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens",
                        method: "GET",
                        isArray: true
                    },

                    "prototype$__create__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens",
                        method: "POST"
                    },


                    "prototype$__delete__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens",
                        method: "DELETE"
                    },


                    "prototype$__count__accessTokens": {
                        url: urlBase + "/Users/:id/accessTokens/count",
                        method: "GET"
                    },


                    "create": {
                        url: urlBase + "/Users",
                        method: "POST"
                    },

                    "upsert": {
                        url: urlBase + "/Users",
                        method: "PUT"
                    },


                    "exists": {
                        url: urlBase + "/Users/:id/exists",
                        method: "GET"
                    },


                    "findById": {
                        url: urlBase + "/Users/:id",
                        method: "GET"
                    },


                    "find": {
                        url: urlBase + "/Users",
                        method: "GET",
                        isArray: true
                    },

                    "findOne": {
                        url: urlBase + "/Users/findOne",
                        method: "GET"
                    },

                    "updateAll": {
                        url: urlBase + "/Users/update",
                        method: "POST"
                    },

                    "deleteById": {
                        url: urlBase + "/Users/:id",
                        method: "DELETE"
                    },


                    "count": {
                        url: urlBase + "/Users/count",
                        method: "GET"
                    },


                    "prototype$updateAttributes": {
                        url: urlBase + "/Users/:id",
                        method: "PUT"
                    },


                    "getCurrent": {
                        url: urlBase + "Users" + "/:id",
                        method: "GET",
                        params: {
                            id: function () {
                                var id = LoopBackAuth.currentUserId;
                                if (id == null) id = '__anonymous__';
                                return id;
                            }
                        },
                        interceptor: {
                            response: function (response) {
                                LoopBackAuth.currentUserData = response.data;
                                return response.resource;
                            }
                        },
                        __isGetCurrentUser__: true
                    }
                }
            );


            R["updateOrCreate"] = R["upsert"];

            R["update"] = R["updateAll"];

            R["destroyById"] = R["deleteById"];

            R["removeById"] = R["deleteById"];


            R.getCachedCurrent = function () {
                var data = LoopBackAuth.currentUserData;
                return data ? new R(data) : null;
            };


            R.isAuthenticated = function () {
                return this.getCurrentId() != null;
            };

            R.getCurrentId = function () {
                return LoopBackAuth.currentUserId;
            };

            R.getCurrentToken = function(){
                return LoopBackAuth.accessTokenId;
            }

            return R;
        }]);


    module
        .factory('LoopBackAuth', function () {
            var props = ['accessTokenId', 'currentUserId'];

            function LoopBackAuth() {
                var self = this;
                props.forEach(function (name) {
                    self[name] = load(name);
                });
                this.rememberMe = undefined;
                this.currentUserData = null;
            }

            LoopBackAuth.prototype.save = function () {
                var self = this;
                var storage = this.rememberMe ? localStorage : sessionStorage;
                props.forEach(function (name) {
                    save(storage, name, self[name]);
                });
            };

            LoopBackAuth.prototype.setUser = function (accessTokenId, userId, userData) {
                this.accessTokenId = accessTokenId;
                this.currentUserId = userId;
                this.currentUserData = userData;
            }

            LoopBackAuth.prototype.clearUser = function () {
                this.accessTokenId = null;
                this.currentUserId = null;
                this.currentUserData = null;
            }

            return new LoopBackAuth();

            // Note: LocalStorage converts the value to string
            // We are using empty string as a marker for null/undefined values.
            function save(storage, name, value) {
                var key = '$LoopBack$' + name;
                if (value == null) value = '';
                storage[key] = value;
            }

            function load(name) {
                var key = '$LoopBack$' + name;
                return localStorage[key] || sessionStorage[key] || null;
            }
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
        }])
        .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
            function ($q, LoopBackAuth) {
                return {
                    'request': function (config) {
                        if (LoopBackAuth.accessTokenId) {
                            config.headers.authorization = LoopBackAuth.accessTokenId;
                        } else if (config.__isGetCurrentUser__) {
                            // Return a stub 401 error for User.getCurrent() when
                            // there is no user logged in
                            var res = {
                                body: { error: { status: 401 } },
                                status: 401,
                                config: config,
                                headers: function () {
                                    return undefined;
                                }
                            };
                            return $q.reject(res);
                        }
                        return config || $q.when(config);
                    }
                }
            }])
        .factory('LoopBackResource', [ '$resource', function ($resource) {
            return function (url, params, actions) {
                var resource = $resource(url, params, actions);

                // Angular always calls POST on $save()
                // This hack is based on
                // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
                resource.prototype.$save = function (success, error) {
                    // Fortunately, LoopBack provides a convenient `upsert` method
                    // that exactly fits our needs.
                    var result = resource.upsert.call(this, {}, this, success, error);
                    return result.$promise || result;
                }

                return resource;
            };
        }]);

})(window, window.angular);
