angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams', '$cookies', 'localStorageService'];
function ProductDetailController(ProductService, $location, $stateParams, $cookies, localStorageService) {
    var pdctrl = this;

    pdctrl.data = $stateParams.productObject;
    var cartProducts = [];

    pdctrl.addToCart = addToCart;
    function addToCart() {
        cartProducts = localStorageService.get("cartProducts");
        if (cartProducts == null) {
            cartProducts.push(pdctrl.data);
            localStorageService.set("cartProducts", cartProducts);
        } else {
            cartProducts.push(pdctrl.data);
            localStorageService.set("cartProducts", cartProducts);
        }

        console.log(localStorageService.get("cartProducts"));
    }

    function cookieExpiryDate(days) {
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + days);
        return cookieExp;
    }
}