(function () {
    'use strict';

    var app = angular.module('bomboka', ['ui.router', 'ngCookies', 'LocalStorageModule', 'ngFileUpload'])
    // angular.module('bomboka', ['ui.router', 'ngCookies'])
        .config(Router, function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('bomboka');
        })
        .run(run)

    function Router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        // User is automatically redirected to the products page when logged in
        // Products page acts as a home screen
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
            .state('user_profile_edit', {
                url: '/user_profile_edit',
                templateUrl: 'templates/user_profile_edit.html',
                controller: 'UserProfileController as userctrl'
            })
            .state('courier_orders', {
                url: '/courier_orders',
                templateUrl: 'templates/courier_orders.html',
                controller: 'CourierController as couctrl'
            })
            .state('product_status_page', {
                url: '/product_status_page',
                templateUrl: 'templates/product_status_page.html',
                controller: 'ProductStatusPageController as psctrl',
                params: {
                    orderObject: null
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController as vm'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'templates/home.html',
                controller: 'LogoutController as ctrl'
            });
    }

    /**
     * Handles auto login.
     * For first time users, we redirect them to the login screen.
     * For a user that has previously used the system within the last seven days,
     * we automatically log them into the system(login)
     * */
    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        console.log("app started");

        $rootScope.globals = $cookies.getObject('globals') || {};
        console.log("user object", $rootScope.globals);
        if ($rootScope.globals.currentUser) {
            console.log("user is logged in");
            $http.defaults.headers.common['Authorization'] = 'Token ' + $rootScope.globals.currentUser.token;
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