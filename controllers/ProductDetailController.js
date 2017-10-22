angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams', '$cookies', 'localStorageService'];
function ProductDetailController(ProductService, $location, $stateParams, $cookies, localStorageService) {
    var pdctrl = this;

    pdctrl.data = $stateParams.productObject;
    console.log("product details: ", pdctrl.data);
    pdctrl.isVisible = true;

    //todo remove on release
    // localStorageService.clearAll();

    toggleAddToCartButton();
    function toggleAddToCartButton() {
        var keys = localStorageService.keys();
        for (var i = 0; i <= keys.length; i++) {
            try {
                if (pdctrl.data.key == localStorageService.get(keys[i]).key) {
                    pdctrl.isVisible = false;
                }
            } catch (err) {
                console.log(err.toString());
            }
        }
    }


    pdctrl.addToCart = addToCart;
    function addToCart() {
        var key = "cartProducts" + makeRandom();
        var newValue = pdctrl.data;
        newValue['cartkey'] = key;
        //give product default quantity of 1
        newValue['quantity'] = 1;
        localStorageService.set(key, newValue);
        pdctrl.isVisible = false;
    }

    function makeRandom() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }


}