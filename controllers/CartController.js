angular.module('bomboka')
    .controller('CartController', CartController);

CartController.$inject = ['CartService', '$location', '$stateParams'];
function CartController(CartService, $location, $stateParams) {
    var cartctrl = this;

    // cartctrl.data = $stateParams.userObject;

}