(function () {
    'use strict';

    angular.module('bomboka')
        .controller('UserProfileController', UserProfileController);


    UserProfileController.$inject = ['localStorageService', 'UserService'];
    function UserProfileController(localStorageService, UserService) {
        var userctrl = this;
        userctrl.updateImage = updateImage;

        // function loadUserData() {
        //     var oldUserObject = localStorageService.get('userObject');
        //     UserService.getById(oldUserObject.key)
        //         .then(
        //             function success(response) {
        //                 console.log("Successfully got user data");
        //                 console.log(response.data);
        //                 userctrl.data = response.data;
        //             },
        //             function failure(error) {
        //                 console.log("Failed to get user data");
        //             }
        //         );
        //     console.log("userprofile");
        //     console.log(userctrl.data);
        // }
        // loadUserData();
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


        function updateImage() {

        }

    }

})();