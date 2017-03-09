(function () {
    angular.module('bomboka')
        .controller('ProductStatusPageController', ProductStatusPageController);

    ProductStatusPageController.$inject = ['$stateParams'];
    function ProductStatusPageController($stateParams) {
        var psctrl = this;

        console.log($stateParams.orderObject);
        psctrl.order = $stateParams.orderObject;
    }
})();