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
        }

        // $scope.file_changed = function(element) {
        //     $scope.$apply(function(scope) {
        //         var photofile = element.files[0];
        //         var reader = new FileReader();
        //         reader.onload = function(e) {
        //             // handle onload
        //             console.log("something happed")
        //         };
        //         reader.readAsDataURL(photofile);
        //     });
        // };


        $scope.uploadedFile = function(element) {

            $scope.$apply(function($scope) {
                $scope.files = element.files;
                console.log($scope.files);
                console.log($scope.files[0]);
            });

        };

        $scope.uploadFile = function(event){
            var files = event.target.files;
            console.log(files[0]);
        };

        $scope.uploadedFile = function(element) {
            $scope.$apply(function($scope) {
                $scope.files = element.files;
                vm.user.image = $scope.files[0];
                console.log("captured file");
                console.log(element.files[0]);
            });
        };

        // $scope.uploadFiles = function (file, errFiles, userKey) {
        //     console.log("uploading...");
        //     console.log(file);
        //     $scope.f = file;
        //     $scope.errFile = errFiles && errFiles[0];
        //     if (file) {
        //         file.upload = Upload.upload({
        //             url: 'http://localhost:9000/api/user/addimage/' + userKey,
        //             data: {image: file}
        //         });
        //
        //         file.upload.then(function (response) {
        //             $timeout(function () {
        //                 userctrl.data = response.data;
        //                 $scope.data = response.data;
        //                 localStorageService.set('userObject', response.data);
        //             });
        //         }, function (response) {
        //             if (response.status > 0)
        //                 $scope.errorMsg = response.status + ': ' + response.data;
        //         }, function (evt) {
        //             file.progress = Math.min(100, parseInt(100.0 *
        //                 evt.loaded / evt.total));
        //         });
        //     }
        // };
    }
})();