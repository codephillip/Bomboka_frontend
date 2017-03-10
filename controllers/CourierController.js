(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CourierController', CourierController);

    CourierController.$inject = ['CourierService'];
    function CourierController(CourierService) {
        var couctrl = this;

        //todo get courier_id after login
        CourierService.getCourierOrders("58bd504be885f018bd8ff224").then(
            function success(response) {
                couctrl.data = response.data;
            },
            function failure(error) {
                console.log("Failed to get orders");
            }
        )
    }

})();