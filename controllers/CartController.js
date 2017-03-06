(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CartController', CartController);

    CartController.$inject = ['CartService', '$location', '$cookies', 'localStorageService'];
    function CartController(CartService, $location, $cookies, localStorageService) {
        var cartctrl = this;
        cartctrl.removeFromCart = removeFromCart;

        loadCartItems();
        function loadCartItems() {
            var keys = localStorageService.keys();
            cartctrl.cartProducts = [];
            cartctrl.cartProductKeys = [];
            for (var i = 0; i <= keys.length; i++) {
                try {
                    if (keys[i].includes('cartProducts') && localStorageService.get(keys[i]) != null) {
                        cartctrl.cartProducts.push(localStorageService.get(keys[i]))
                        cartctrl.cartProductKeys.push(keys[i])
                    }
                } catch (err) {
                    console.log(err.toString());
                }
            }
        }

        function removeFromCart(key) {
            console.log("Remove from cart");
            localStorageService.remove(key);
            loadCartItems();
        }
    }

})();