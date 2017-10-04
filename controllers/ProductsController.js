angular.module('bomboka')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['ProductService'];
function ProductsController(ProductService) {
    var prodctrl = this;
    prodctrl.searchProducts = searchProducts;
    prodctrl.displayProducts = displayProducts;

    console.log("display products");
    displayProducts();
    function displayProducts() {
        //todo extract shop_id and pass it to this method
        ProductService.GetAll()
            .then(function success(response) {
                prodctrl.data = response.data;
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