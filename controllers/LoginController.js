(function () {
    'use strict';
    angular.module('bomboka')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UserService', '$location', '$cookies', '$rootScope', '$http', 'AuthenticationService', 'FlashService', 'localStorageService', 'Upload', '$scope'];
    function LoginController(UserService, $location, $cookies, $rootScope, $http, AuthenticationService, FlashService, localStorageService, Upload, $scope) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, receiveUserDetails);
        }

        function receiveUserDetails(response) {
            console.log("save user data");
            console.log(response);
            AuthenticationService.SetCredentials(response.data);

            UserService.getUserIdFromServer().then(
                function (response) {
                    console.log(response.data);
                    saveUserDetails(response.data);
                },
                function (response) {
                    console.log(response.data);
                }
            );
        }

        function stripToken() {
            const authHeader = $http.defaults.headers.common.Authorization;
            return authHeader.substring(6);
        }

        function saveUserDetails(object) {
            UserService.getUserDetailsFromServer(object['id']).then(
                function success(response) {
                    var userObject = response.data;

                    $rootScope.globals = {
                        currentUser: {
                            username: userObject.username,
                            email: userObject.email,
                            id: userObject.id,
                            first_name: userObject.first_name,
                            last_name: userObject.last_name,
                            image: userObject.image,
                            phone: userObject.phone,
                            token: stripToken()
                        }
                    };

                    // todo decide which storage mechanism to use(localStorageService only)
                    // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
                    console.log("Saving cookie" + $rootScope.globals);
                    var cookieExp = new Date();
                    cookieExp.setDate(cookieExp.getDate() + 7);
                    $cookies.putObject('globals', $rootScope.globals, {expires: cookieExp});
                    //use localStorageService to allow proper access to user data in other sections
                    localStorageService.set('userObject', userObject);
                    console.log("User cookie data" + $cookies.getObject('globals').currentUser.username);
                    // redirect to home screen(index page)
                    $location.path('home');
                },
                function failure(response) {
                    console.log(response.data);
                }
            );
        }

        function register() {
            console.log("user sign up");
            vm.dataLoading = true;
            vm.user.image = $scope.userImage;
            console.log("user data ", vm.user);
            if (vm.user.password == vm.user.passwordConfirm) {
                UserService.signUp(vm.user)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('Registration successful', true);
                            // $location.path('/login');
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
            } else {
                // TODO SHOW ERROR MESSAGE
                console.log("password mismatch");
            }
        }
    }
})();