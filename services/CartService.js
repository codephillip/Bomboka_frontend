(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('CartService', CartService);

    CartService.$inject = ['$http'];
    function CartService($http) {
        var service = {};
        service.GetAll = GetAll;
        return service;

        function GetAll(userId) {
            return $http.get('http://127.0.0.1:9000/api/order/cartItems/' + userId);
        }
    }

})();
