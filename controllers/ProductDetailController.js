angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams', '$cookies', 'localStorageService'];
function ProductDetailController(ProductService, $location, $stateParams, $cookies, localStorageService) {
    var pdctrl = this;

    pdctrl.data = $stateParams.productObject;
    var cartProducts = [];

    pdctrl.addToCart = addToCart;
    function addToCart() {
        var key = "cartProducts" + makeRandom();
        localStorageService.set(key, pdctrl.data);
        console.log(localStorageService.keys());
    }

    function makeRandom() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


}