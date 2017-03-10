(function () {
    angular.module('bomboka')
        .controller('ProductStatusPageController', ProductStatusPageController);

    ProductStatusPageController.$inject = ['$stateParams', 'CourierService'];
    function ProductStatusPageController($stateParams, CourierService) {
        var psctrl = this;

        psctrl.isVisible = false;
        psctrl.serverResponse = false;
        psctrl.verifyCode = verifyCode;
        psctrl.order = $stateParams.orderObject;

        function verifyCode() {
            CourierService.verifyDelivery(psctrl.verication_code, psctrl.order.key).then(
                function success(response) {
                    psctrl.isVisible = true;
                    psctrl.serverResponse = response.data;
                },
                function failure(error) {
                    console.log("Failed to verify delivery");
                }
            )
        }
    }
})();