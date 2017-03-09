(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('CourierService', CourierService);

    CourierService.$inject = ['$http'];
    function CourierService($http) {
        var service = {};
        service.getCourierOrders = getCourierOrders;

        return service;

        function getCourierOrders(courierId) {
            return $http.get('http://localhost:9000/api/orders/' + courierId);
        }
    }

})();
