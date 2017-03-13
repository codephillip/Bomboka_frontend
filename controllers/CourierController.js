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
        //give a default choice of 'Delivered'
        couctrl.statusChoice = couctrl.statusChoices[0].id;

        //give start and end date default values
        couctrl.startDate = couctrl.endDate = new Date();
        couctrl.isDateRangeWrong = false;

        //todo get courier_id after login
        CourierService.getCourierOrders("58c2cd5be885f0102b77777e").then(
            function success(response) {
                couctrl.data = response.data;
                createVendorChoices(CourierService.getAllVendors());
            },
            function failure(error) {
                console.log("Failed to get orders");
            }
        );

        function createVendorChoices(promise) {
            promise.then(
                function success(response) {
                    couctrl.vendorChoices = [];
                    for (var i =0; i <= response.data.length; i++)
                        couctrl.vendorChoices.push(createVendorChoiceObject(response.data[i].key, response.data[i].name));

                    function createVendorChoiceObject(id, name) {
                        return {'id': id, 'name': name}
                    }
                },
                function failure(error) {
                    console.log("Failed to get vendors");
                }
            );
        }

        function openProductStatusPage(orderObject) {
            $state.go('product_status_page', {'orderObject': orderObject})
        }


        function onValueChange() {
            console.log(couctrl.startDate);

            if (checkDateRange()) {
                //todo get courier_id after login
                CourierService.getOrdersUsingParams("58c2cd5be885f0102b77777e", couctrl.statusChoice, couctrl.vendorChoice, couctrl.startDate, couctrl.endDate).then(
                    function success(response) {
                        couctrl.data = response.data;
                    },
                    function failure(error) {
                        console.log("Failed to get delivered orders");
                    }
                );
            }

            function checkDateRange() {
                if (couctrl.endDate >= couctrl.startDate){
                    console.log("good range");
                    couctrl.isDateRangeWrong = false;
                    return true
                }
                else{
                    console.log("bad range");
                    couctrl.isDateRangeWrong = true;
                    throw new RangeError;
                }
            }
        }
    }
})();