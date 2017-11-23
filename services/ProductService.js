(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http', '$location'];
    function ProductService($http, $location) {
        var service = {};
        service.getAll = getAll;
        service.getDailyDiscounts = getDailyDiscounts;
        service.GetByShop = GetByShop;
        service.GetById = GetById;
        service.Search = Search;
        return service;

        function getAll() {
            return $http.get('http://127.0.0.1:8000/api/v1/products');
        }

        function GetByShop(shopId) {
            return $http.get('http://127.0.0.1:9000/api/shop/products/' + shopId);
        }

        function getDailyDiscounts(userId) {
            console.log("discount request: ", userId);
            return $http.get('http://127.0.0.1:8000/api/v1/users/'+ userId +'/discounts');
        }

        function GetById(productId) {
            return $http.get('http://127.0.0.1:9000/api/product/' + productId);
        }

        function Search(keyword) {
            return $http({
                url: 'http://localhost:9000/api/product/search',
                method: "POST",
                data: {'keyword': keyword}
            })
        }
    }

})();
