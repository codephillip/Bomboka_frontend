(function () {
    'use strict';

    angular.module('bomboka')
        .controller('UserProfileController', UserProfileController);

    //UserProfileController works on user_profile.html and user_profile_edit.html
    UserProfileController.$inject = ['localStorageService', 'UserService', '$scope', 'Upload', '$timeout'];
    function UserProfileController(localStorageService, UserService, $scope, Upload, $timeout) {
        var userctrl = this;

        userctrl.updateProfile = updateProfile;

        var userObject = localStorageService.get('userObject');
        console.log(userObject);

        UserService.getById(userObject.key)
            .then(
                function success(response) {
                    userctrl.data = response.data;
                    //save the new user object that will be used by the header-directive
                    localStorageService.set('userObject', response.data);
                    //slice the dob String for the user_profile.html
                    userctrl.data['slicedDOB'] = response.data.dob.slice(0, 10);
                    //convert from String to Date object for the date input field
                    userctrl.data['dob'] = new Date(response.data.dob);
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
        };

        function updateProfile() {
            UserService.updateInfo(userctrl.data).then(
                function (response) {
                    console.log("Successfully updated profile");
                    localStorageService.set('userObject', response.data);
                },
                function (error) {
                    console.log("Failed to update profile");
                }
            )
        }
    }
})();