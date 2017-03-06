angular.module('bomboka')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['ProductService'];
function ProductsController(ProductService) {
    var prodctrl = this;

    //todo extract shop_id and pass it to this method
    prodctrl.data = ProductService.GetAll()
        .then(function success(response) {
            console.log(response.data);
            prodctrl.data = response.data;
        }, function failure(error) {
            console.log("Server Connection Error", error);
        });
    console.log(prodctrl.data);

    prodctrl.searchProducts = searchProducts;

    function searchProducts() {
        prodctrl.data = ProductService.Search(prodctrl.keyword)
            .then(function success(response) {
                console.log(response.data);
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