(function () {
    'use strict';

    angular.module('bomboka')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$location', 'AuthenticationService'];

    function LogoutController($location, AuthenticationService) {
        (function initController() {
            logoutUser();
        })();

        /**
         * Logout user at the server. This invalidates his token
         * Then we clear cache credentials
         * And finally redirect the user to the login page
         */
        function logoutUser() {
            console.log("logout started");
            AuthenticationService.logout().then(
                function success(response) {
                    console.log("success");
                    AuthenticationService.ClearCredentials();
                    $location.path('login');
                },
                function failure(response) {
                    console.log("failure");
                }
            );
        }
    }

})();