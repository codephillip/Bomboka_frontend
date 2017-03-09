(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CourierController', CourierController);

    CourierController.$inject = ['CourierService'];
    function CourierController(CourierService) {
        var couctrl = this;

        //todo get courier_id after login
        CourierService.getCourierOrders("58bd5043e885f018bd8ff223").then(
            function success(response) {
                couctrl.data = response.data;
            },
            function failure(error) {
                console.log("Failed to get orders");
            }
        )
    }

})();