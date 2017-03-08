(function () {
    'use strict';

    angular.module('bomboka')
        .controller('UserProfileController', UserProfileController);


    UserProfileController.$inject = ['localStorageService', 'UserService', '$scope', 'Upload', '$timeout'];
    function UserProfileController(localStorageService, UserService, $scope, Upload, $timeout) {
        var userctrl = this;

        var oldUserObject = localStorageService.get('userObject');
        console.log("Loading...");
        console.log(oldUserObject);

        UserService.getById(oldUserObject.key)
            .then(
                function success(response) {
                    console.log("Successfully got user data");
                    console.log(response.data);
                    userctrl.data = response.data;
                },
                function failure(error) {
                    console.log("Failed to get user data");
                }
            );
        console.log("userprofile");
        console.log(userctrl.data);

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
                        file.result = response.data;
                        userctrl.data = response.data;
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