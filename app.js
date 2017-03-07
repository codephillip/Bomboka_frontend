(function () {
    'use strict';

    angular.module('bomboka', ['ui.router', 'ngCookies', 'LocalStorageModule'])
        .config(Router, function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('bomboka');
        });

    function Router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('products', {
                url: '/',
                templateUrl: 'templates/products.html',
                controller: 'ProductsController as prodctrl'
            })
            .state('product_detail', {
                url: '/product_detail',
                templateUrl: 'templates/product_detail.html',
                controller: 'ProductDetailController as pdctrl',
                params: {
                    productObject: null
                }
            })
            .state('cart', {
                url: '/cart',
                templateUrl: 'templates/cart.html',
                controller: 'CartController as cartctrl'
            })
            .state('user_profile', {
                url: '/user_profile',
                templateUrl: 'templates/user_profile.html',
                controller: 'UserProfileController as userctrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController as vm'
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();