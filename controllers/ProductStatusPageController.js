(function () {
    angular.module('bomboka')
        .controller('ProductStatusPageController', ProductStatusPageController);

    ProductStatusPageController.$inject = ['$stateParams', 'CourierService'];
    function ProductStatusPageController($stateParams, CourierService) {
        var psctrl = this;

        psctrl.verifyCode = verifyCode;

        console.log($stateParams.orderObject);
        psctrl.order = $stateParams.orderObject;

        function verifyCode() {
            CourierService.verifyDelivery(psctrl.verication_code, psctrl.order.key).then(
                function success(response) {
                    console.log("Successfully delivered");
                    console.log(response.data);
                },
                function failure(error) {
                    console.log("Failed to verify delivery");
                }
            )
        }
    }
})();