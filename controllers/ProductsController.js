angular.module('bomboka')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['ProductService', '$cookies'];
function ProductsController(ProductService, $cookies) {
    var prodctrl = this;
    prodctrl.searchProducts = searchProducts;
    prodctrl.displayProducts = displayProducts;
    prodctrl.discountProducts = discountProducts;

    (function initController() {
        console.log("initializer started");
        displayProducts();
        discountProducts();
    })();

    function displayProducts() {
        ProductService.getAll()
            .then(function success(response) {
                prodctrl.data = response.data;
                displayProducts()
            }, function failure(error) {
                console.log("Server Connection Error", error);
            });
    }

    function discountProducts() {
        var currentUser = $cookies.getObject('globals').currentUser;
        console.log('current user: ', currentUser);
        ProductService.getDailyDiscounts(currentUser.id)
            .then(function success(response) {
                prodctrl.discount_products = response.data;
            }, function failure(error) {
                console.log("Server Connection Error", error);
            });
    }

    function searchProducts() {
        prodctrl.data = ProductService.Search(prodctrl.keyword)
            .then(function success(response) {
                //todo display relevant error message to user
                if(response.data.length <= 0)
                    console.log("No items found");
                else
                    prodctrl.data = response.data;
            }, function failure(error) {
                console.log("Server Connection Error", error);
            });
    }
}