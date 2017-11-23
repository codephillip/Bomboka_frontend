(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('CartService', CartService);

    CartService.$inject = ['$http'];
    function CartService($http) {
        var service = {};
        service.getAll = getAll;
        return service;

        function getAll(userId) {
            return $http.get('http://127.0.0.1:9000/api/order/cartItems/' + userId);
        }
    }

})();
