angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams', '$cookies', 'localStorageService'];
function ProductDetailController(ProductService, $location, $stateParams, $cookies, localStorageService) {
    var pdctrl = this;

    pdctrl.data = $stateParams.productObject;
    pdctrl.isVisible = true;

    //todo remove on release
    // localStorageService.clearAll();

    toggleAddToCartButton();
    function toggleAddToCartButton() {
        console.log("toggleAddToCartButton started");
        console.log("toggleAddToCartButton " + pdctrl.isVisible);
        var keys = localStorageService.keys();
        for (var i = 0; i <= keys.length; i++) {
            console.log("toggleAddToCartButton checking");
            console.log(localStorageService.get(keys[i]));
            console.log(pdctrl.data);
            try {
                if (pdctrl.data.key == localStorageService.get(keys[i]).key) {
                    pdctrl.isVisible = false;
                    console.log("toggleAddToCartButton found#" + pdctrl.isVisible);
                }
            } catch (err) {
                console.log(err.toString());
            }
        }
    }


    pdctrl.addToCart = addToCart;
    function addToCart() {
        console.log("addtocart");
        var key = "cartProducts" + makeRandom();
        var newValue = pdctrl.data;
        newValue['cartkey'] = key;
        //give product default quantity of 1
        newValue['quantity'] = 1;
        console.log(newValue);
        localStorageService.set(key, newValue);
        console.log(localStorageService.keys());
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