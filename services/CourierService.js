(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('CourierService', CourierService);

    CourierService.$inject = ['$http'];
    function CourierService($http) {
        var service = {};
        service.getCourierOrders = getCourierOrders;
        service.getAllVendors = getAllVendors;
        service.verifyDelivery = verifyDelivery;
        service.getOrdersUsingParams = getOrdersUsingParams;

        return service;

        function getCourierOrders(courierId) {
            return $http.get('http://localhost:9000/api/orders/' + courierId);
        }

        function getAllVendors() {
            console.log("get all vendors");
            return $http.get('http://localhost:9000/api/vendor');
        }

        function verifyDelivery(vericationCode, orderId) {
            return $http.post('http://localhost:9000/api/order/received/' + orderId, {'verificationCode': vericationCode})
        }

        function getOrdersUsingParams(courierId, isDelivered, vendorId, startDate, endDate) {
            console.log("getDeliveredOrders");

            var startDateString = startDate.getDate()  + "/" + (startDate.getMonth() + 1) + "/" + startDate.getUTCFullYear();
            var endDateString = endDate.getDate()  + "/" + (endDate.getMonth() + 1) + "/" + endDate.getUTCFullYear();
            console.log('endDateString');
            console.log(endDateString);
            return $http.get('http://127.0.0.1:9000/api/orders/courier/byParams?courierID=' + courierId + '&isDelivered=' + isDelivered + '&vendorID=' + vendorId + '&startDate=' + startDateString + '&endDate=' + endDateString)
        }
    }
})();
