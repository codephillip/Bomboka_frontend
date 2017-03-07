(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CartController', CartController);

    CartController.$inject = ['CartService', '$location', '$cookies', 'localStorageService'];
    function CartController(CartService, $location, $cookies, localStorageService) {
        var cartctrl = this;
        cartctrl.removeFromCart = removeFromCart;
        cartctrl.getSubtotal = getSubtotal;
        cartctrl.grandtotal = 0;
        cartctrl.value;
        cartctrl.quantity = [
            {id:'1', name:1},
            {id:'2', name:2},
            {id:'3', name:3},
            {id:'4', name:4},
            {id:'5', name:5},
            {id:'6', name:6}
        ];

        loadCartItems();
        function loadCartItems() {
            var keys = localStorageService.keys();
            cartctrl.cartProducts = [];
            for (var i = 0; i <= keys.length; i++) {
                try {
                    if (keys[i].includes('cartProducts') && localStorageService.get(keys[i]) != null) {
                        cartctrl.cartProducts.push(localStorageService.get(keys[i]));
                    }
                } catch (err) {
                    console.log(err.toString());
                }
            }
            console.log("cartItems#");
            console.log(cartctrl.cartProducts);
        }

        function removeFromCart(key) {
            console.log("Remove from cart");
            localStorageService.remove(key);
            loadCartItems();
        }

        function getSubtotal(price, quantity, grandtotal) {
            cartctrl.grandtotal += price * quantity;
            return price * quantity;
        }
        
        function getGrandtotal() {
            
        }
    }

})();