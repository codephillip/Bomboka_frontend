angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams'];
function ProductDetailController(ProductService, $location, $stateParams) {
    var pdctrl = this;

    pdctrl.data = $stateParams.productObject;

}