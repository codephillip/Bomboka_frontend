angular.module('bomboka')
    .controller('CartController', CartController);

// CartController.$inject = ['CartService', '$location', '$stateParams', '$rootScope'];
// function CartController(CartService, $location, $stateParams, $rootScope) {
CartController.$inject = ['$location', '$stateParams', '$rootScope', '$cookies'];
function CartController($location, $stateParams, $rootScope, $cookies) {
    var cartctrl = this;

    // cartctrl.data = $stateParams.userObject;

    var userCookie =  $cookies.getObject('globals').currentUser;
    // console.log("Logged in user: " + $rootScope.globals.currentUser);
    console.log("Logged in user: " + userCookie.username);


}