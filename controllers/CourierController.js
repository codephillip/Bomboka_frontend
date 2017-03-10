(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CourierController', CourierController);

    CourierController.$inject = ['CourierService', '$state'];
    function CourierController(CourierService, $state) {
        var couctrl = this;

        couctrl.openProductStatusPage = openProductStatusPage;
        couctrl.onValueChange = onValueChange;

        couctrl.statusChoices = [
            {id: true, name: 'Delivered'},
            {id: false, name: 'Not Delivered'}
        ];
        //give a default choice of 'Not Delivered'
        couctrl.statusChoice = couctrl.statusChoices[1].id;

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
            $state.go('product_status_page', {'orderObject': orderObject})
        }

        function onValueChange() {
            console.log("selected value");
            console.log(couctrl.statusChoice);

            //todo get courier_id after login
            CourierService.getOrdersUsingParams("58bd504be885f018bd8ff224", couctrl.statusChoice).then(
                function success(response) {
                    couctrl.data = response.data;
                    console.log("Successfully got orders");
                    console.log(couctrl.data);
                },
                function failure(error) {
                    console.log("Failed to get delivered orders");
                }
            );
        }
    }
})();