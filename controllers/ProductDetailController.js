angular.module('bomboka')
    .controller('ProductDetailController', ProductDetailController);

ProductDetailController.$inject = ['ProductService', '$location', '$stateParams'];
function ProductDetailController(ProductService, $location, $stateParams) {
    var pdctrl = this;

    console.log('gc', $stateParams.productId);



    //todo extract shop_id and pass it to this method
    // pdctrl.data = ProductService.GetAll('58b3f359e885f00be2dd87c3')
    //     .then(function success(response) {
    //         console.log(response.data);
    //         pdctrl.data = response.data;
    //     }, function failure(error) {
    //         console.log("Server Connection Error", error);
    //     });
    // console.log(pdctrl.data);
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