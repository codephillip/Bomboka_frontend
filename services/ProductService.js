﻿(function () {
    'use strict';

    angular
        .module('bomboka')
        .factory('ProductService', ProductService);

    ProductService.$inject = ['$http', '$location'];
    function ProductService($http, $location) {
        var service = {};
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Search = Search;
        return service;

        function GetAll(shopId) {
            return $http.get('http://127.0.0.1:9000/api/shop/products/' + shopId);
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
