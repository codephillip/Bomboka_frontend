(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('CourierService', CourierService);

    CourierService.$inject = ['$http'];
    function CourierService($http) {
        var service = {};
        service.getCourierOrders = getCourierOrders;
        service.verifyDelivery = verifyDelivery;

        return service;

        function getCourierOrders(courierId) {
            return $http.get('http://localhost:9000/api/orders/' + courierId);
        }

        function verifyDelivery(vericationCode, orderId) {
            return $http.post('http://localhost:9000/api/order/received/' + orderId, {'verificationCode': vericationCode})
        }
    }

})();
