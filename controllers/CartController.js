angular.module('bomboka')
    .controller('CartController', CartController);

// CartController.$inject = ['CartService', '$location', '$stateParams', '$rootScope'];
// function CartController(CartService, $location, $stateParams, $rootScope) {
CartController.$inject = ['$location', '$stateParams', '$rootScope', '$cookies'];
function CartController($location, $stateParams, $rootScope, $cookies) {
    var cartctrl = this;

    // cartctrl.data = $stateParams.userObject;

    var cookieObject =  $cookies.getObject('globals');
    cartctrl.user = $rootScope.globals;
    // console.log("Logged in user: " + $rootScope.globals.currentUser);
    console.log("Logged in user: " + cookieObject);

    // Setting a cookie
    var cookieExp = new Date();
    cookieExp.setDate(cookieExp.getDate() + 7);
    $cookies.put('myFavorite', 'oatmeal',  { expires: cookieExp });

    var favoriteCookie = $cookies.get('myFavorite');
    console.log("Test cookies " + favoriteCookie);



}