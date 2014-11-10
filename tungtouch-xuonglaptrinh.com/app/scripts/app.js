'use strict';

/**
 * @ngdoc overview
 * @name labApp
 * @description
 * # labApp
 *
 * Main module of the application.
 */
angular
    .module('labApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/home');
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                abstract: true
            })
            .state('main.home', {
                url: '/home',
                templateUrl: 'views/states/home.html',
                controller: 'HomeCtrl'
            })
            .state('main.introduction', {
                url: '/gioi-thieu',
                templateUrl: 'views/states/introduction.html',
            })
            .state('main.admission', {
                url: '/tuyen-sinh',
                templateUrl: 'views/states/admission.html',
            })
            .state('main.job', {
                url: '/viec-lam',
                templateUrl: 'views/states/job.html',
            })
    });
