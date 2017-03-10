(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CourierController', CourierController);

    CourierController.$inject = ['CourierService', '$state'];
    function CourierController(CourierService, $state) {
        var couctrl = this;

        couctrl.openProductStatusPage = openProductStatusPage;

        //todo get courier_id after login
        CourierService.getCourierOrders("58bd504be885f018bd8ff224").then(
            function success(response) {
                couctrl.data = response.data;
            },
            function failure(error) {
                console.log("Failed to get orders");
            }
        );

        function openProductStatusPage(orderObject) {
            console.log("clicked");
            console.log(orderObject);
            $state.go('product_status_page', {'orderObject': orderObject})
        }

    }

})();