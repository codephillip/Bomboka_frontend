(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$location'];

    function UserService($http, $location) {
        var service = {};
        // todo refactor this
        service.signUp = signUp;
        service.getById = getById;
        service.sendImage = sendImage;
        service.updateInfo = updateInfo;
        service.getUserIdFromServer = getUserIdFromServer;
        service.getUserDetailsFromServer = getUserDetailsFromServer;
        service.hello = hello;

        return service;

        function formatDate(user) {
            return user.dob.toISOString().substring(0, 10);
        }

        function signUp(user) {
            console.log("signing up");
            console.log(user);
            var data = {
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "dob": formatDate(user),
                "password": user.password,
                "gender": 0,
                "email": user.email,
                "image": user.image,
                "phone": user.phone
            };
            var fd = new FormData();
            console.log("form: ", fd);
            for(var value in data) {
                console.log(value, data[value]);
                fd.append(value, data[value])
            }

            var uploadUrl = 'http://127.0.0.1:8000/auth/register/';
            return $http.post(uploadUrl, fd, {
                transformRequest:angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                console.log('response ::::',response.data);
                return response.data;
            });

            // return $http({
            //     url: 'http://127.0.0.1:8000/auth/register/',
            //     method: "POST",
            //     data: JSON.stringify(data),
            //         transformRequest:angular.identity,
            //         headers: {'Content-Type': undefined}
            //     // headers: {'Content-Type': 'charset=utf-8'}
            //
            // }).then(function (response) {
            //         // success
            //         console.log("Successfully signed up");
            //         $location.path("home");
            //     },
            //     function (response) { // optional
            //         // failed
            //         console.log("Failed to signed up");
            //         console.log(response.data);
            //     });
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

    function generateRandomString() {
        return Math.random().toString(36).substring(7);
    }
})();
