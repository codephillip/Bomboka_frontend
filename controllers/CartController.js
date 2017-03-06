angular.module('bomboka')
    .controller('CartController', CartController);

CartController.$inject = ['CartService', '$location', '$cookies'];
function CartController(CartService, $location, $cookies) {
    var cartctrl = this;

    // cartctrl.data = $stateParams.userObject;

    var userCookie = $cookies.getObject('globals').currentUser;
    // console.log("Logged in user: " + $rootScope.globals.currentUser);
    console.log("Logged in user: " + userCookie.username);
    console.log("Logged in user: " + userCookie.userkey);

    CartService.GetAll(userCookie.userkey)
        .then(
            function success(response) {
                console.log("Cart items in user");
                console.log(response.data);
                cartctrl.data = response.data;
            },
            function failure(error) {
                console.log("Failed to get Cart items");
            }
        );


}