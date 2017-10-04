(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$location'];
    function UserService($http, $location) {
        var service = {};
        service.Create = Create;
        service.getById = getById;
        service.sendImage = sendImage;
        service.updateInfo = updateInfo;
        service.getUserIdFromServer = getUserIdFromServer;
        service.getUserDetailsFromServer = getUserDetailsFromServer;
        service.hello = hello;

        return service;

        function Create(user) {
            console.log("signing up");
            //todo compare emails and passwords
            return $http({
                url: 'http://localhost:9000/api/users/signup',
                method: "POST",
                data: {
                    'username': user.firstname + user.lastname,
                    'password': user.password_signup1,
                    'email': user.email_phone1,
                    'gender': user.sex,
                    'country': user.country
                }
            }).then(function (response) {
                    // success
                    console.log("Successfully signed up");
                    $location.path("home");
                },
                function (response) { // optional
                    // failed
                    console.log("Failed to signed up");
                });
        }

        function getById(userId) {
            return $http.get('http://localhost:9000/api/user/' + userId);
        }

        function getUserIdFromServer() {
            console.log("get user id");
            return $http.get('http://127.0.0.1:8000/auth/me/');
        }

        function getUserDetailsFromServer(userId) {
            console.log("get user details");
            return $http.get('http://127.0.0.1:8000/api/v1/users/' + userId);
        }

        function hello() {
            console.log("hello world");
        }

        function sendImage(userId, data) {
            return $http.post('http://localhost:9000/api/user/addimage/' + userId, {'image1': data}, {headers: {'Content-Type': 'multipart/form-data'}});
        }

        function updateInfo(user) {
            console.log("DOB ");
            console.log(user);
            //captured date as string dd/mm/yyyy
            var dateOfBirth = user.dob;
            console.log(angular.isDate(dateOfBirth));
            console.log(angular.isString(dateOfBirth));
            var userObject = {
                'fullnames': user.fullnames,
                'username': user.username,
                'address': user.address,
                'email': user.email,
                'phoneNumber': user.phoneNumber,
                'sex': user.sex,
                'dob': dateOfBirth
            };
            return $http.post('http://localhost:9000/api/users/edit/' + user.key, userObject);
        }
    }

})();
