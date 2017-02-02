/**
 * Created by Arnold on 2/2/2017.
 */

(function () {
    'use strict';

    var app = angular.module("Bomboka", ['ui.router']);
    app.run(function ($state, $location, LoginService) {
        if (LoginService.isAuthenticated()) {
        } else {
            $state.transitionTo('login');
        }

    });

    app.controller('LoginController', function ($scope, $state, LoginService) {
        console.log('loginController');
        $scope.formLogin = function () {
            if (LoginService.login($scope.username, $scope.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('store');
            } else {
                $scope.error = 'Invalid username/password';
            }
        };
    });

    app.controller('LoginController', function ($scope) {
    });

    app.controller('StoreController', function ($scope, $state) {
        //    body for the store

    });

    app.controller('SignUpController', function ($scope) {
        $scope.birthday = new Date('2012-08-03');

        $scope.submitForm = function (valid) {
            if (valid) {
                //TODO submit to the server
                console.log("form submitted");
            } else {
                console.log("Invalid form");
            }

        };
    });

    app.config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('login', {
                url: '/login',
                // templateUrl: '/login.html',
                controller: 'LoginController'
            })
            .state('signup', {
                url: '/signup',
                // templateUrl: '/login.html',
                controller: 'SignUpController'
            })
            .state('store', {
                url: '/store',
                templateUrl: '/store.html',
                controller: 'StoreController'
            });
    });

    app.factory('LoginService', function () {
        var isAuthenticated = false;
        var error = '';
        return {
            //TODO post to server to get authenticate
            login: function (username, password) {
                if (username == 'Test' && password == '1234') {
                    isAuthenticated = true;
                    return isAuthenticated;
                }
            }, isAuthenticated: function () {
                return isAuthenticated;
            }
        };
    });

})();