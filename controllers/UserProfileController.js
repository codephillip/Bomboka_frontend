(function () {
    'use strict';

    angular.module('bomboka')
        .controller('UserProfileController', UserProfileController);


    UserProfileController.$inject = ['localStorageService', 'UserService', '$scope', 'Upload', '$timeout'];
    function UserProfileController(localStorageService, UserService, $scope, Upload, $timeout) {
        var userctrl = this;

        var oldUserObject = localStorageService.get('userObject');

        UserService.getById(oldUserObject.key)
            .then(
                function success(response) {
                    userctrl.data = response.data;
                    //using $scope sends data to the header-directive
                    $scope.data = response.data;
                },
                function failure(error) {
                    console.log("Failed to get user data");
                }
            );

        $scope.uploadFiles = function (file, errFiles, userKey) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: 'http://localhost:9000/api/user/addimage/' + userKey,
                    data: {image1: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        userctrl.data = response.data;
                        $scope.data = response.data;
                        localStorageService.set('userObject', response.data);

                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }
    }
})();