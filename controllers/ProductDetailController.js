angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams'];
function ProductDetailController(ProductService, $location, $stateParams) {
    var pdctrl = this;

    console.log('pdctrl', $stateParams.productId.toString());

    //todo extract product_id and pass it to this method
    pdctrl.data = ProductService.GetById('58b932e2e885f047c468373c')
        .then(function success(response) {
            console.log(response.data);
            pdctrl.data = response.data;
        }, function failure(error) {
            console.log("Server Connection Error", error);
        });
    console.log(pdctrl.data);




    //
    // pdctrl.searchProducts = searchProducts;
    //
    // function searchProducts() {
    //     pdctrl.data = ProductService.Search(pdctrl.keyword)
    //         .then(function success(response) {
    //             console.log(response.data);
    //             //todo display relevant error message to user
    //             if(response.data.length <= 0){
    //                 console.log("No items found");
    //                 $location.path('/');
    //             }
    //             else {
    //                 prodctrl.data = response.data;
    //                 $location.path('/');
    //             }
    //         }, function failure(error) {
    //             console.log("Server Connection Error", error);
    //         });
    // }
}