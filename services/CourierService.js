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
        service.getOrdersUsingParams = getOrdersUsingParams;

        return service;

        function getCourierOrders(courierId) {
            return $http.get('http://localhost:9000/api/orders/' + courierId);
        }

        function verifyDelivery(vericationCode, orderId) {
            return $http.post('http://localhost:9000/api/order/received/' + orderId, {'verificationCode': vericationCode})
        }

        function getOrdersUsingParams(courierId, isDelivered) {
            console.log("getDeliveredOrders");
            return $http.get('http://127.0.0.1:9000/api/orders/courier/byParams?courierID=' + courierId + '&isDelivered=' + isDelivered)
        }
    }
})();
