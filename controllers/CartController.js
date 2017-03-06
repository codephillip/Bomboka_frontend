(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CartController', CartController);

    CartController.$inject = ['CartService', '$location', '$cookies', 'localStorageService'];
    function CartController(CartService, $location, $cookies, localStorageService) {
        var cartctrl = this;

        var keys = localStorageService.keys();
        cartctrl.cartProducts = [];
        for (var i = 0; i <= keys.length; i++) {
            try {
                console.log("Before check" + keys[i]);
                if (keys[i].includes('cartProducts') && localStorageService.get(keys[i]) != null) {
                    console.log("contains" + keys[i]);
                    console.log(localStorageService.get(keys[i]));
                    cartctrl.cartProducts.push(localStorageService.get(keys[i]))
                }
            } catch (err) {
                console.log(err.toString());
            }
        }

        console.log("cartproducts#");
        console.log(cartctrl.cartProducts);
    }



})();