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

        }

        function Update(user) {
            //todo
        }

        function Delete(id) {
            //todo
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
