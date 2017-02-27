angular.module('bomboka')
    .controller('ProductsController', ProductsController);

ProductsController.$inject = ['ProductService'];
function ProductsController(ProductService) {
    var prodctrl = this;
    prodctrl.name = "codephillip";

    //todo extract shop_id and pass it to this method
    prodctrl.data = ProductService.GetAll('58b3f359e885f00be2dd87c3')
        .then(function success(response) {
            console.log(response.data);
            prodctrl.data = response.data;
        }, function failure(error) {
            console.log("Server Connection Error",error);
        });
    console.log(prodctrl.data);
}