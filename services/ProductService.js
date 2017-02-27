(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http', '$location'];
    function ProductService($http, $location) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll(shopId) {
            return $http.get('http://127.0.0.1:9000/api/shop/products/' + shopId);
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            // console.log("signing up");
            // console.log(user.firstname);
            // console.log(user.lastname);
            // console.log(user.email_phone1);
            // console.log(user.email_phone2);
            // console.log(user.password_signup1);
            // console.log(user.password_signup2);
            // console.log(user.sex);
            // console.log(user.country);
            //
            // //todo compare emails and passwords
            //
            // return $http({
            //     url: 'http://localhost:9000/api/users/signup',
            //     method: "POST",
            //     data: {'username': user.firstname + user.lastname, 'password': user.password_signup1, 'email': user.email_phone1, 'gender': user.sex, 'country': user.country }
            // }).then(function (response) {
            //         // success
            //         console.log("Successfully signed up");
            //         $location.path("home");
            //     },
            //     function (response) { // optional
            //         // failed
            //         console.log("Failed to signed up");
            //     });
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            console.log(res.data);
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }

})();
