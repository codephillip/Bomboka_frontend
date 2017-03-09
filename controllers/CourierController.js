(function () {
    'use strict';

    angular.module('bomboka')
        .controller('CourierController', CourierController);


    function CourierController() {
        var corctrl = this;

        corctrl.dummy = "codephillip";
    }

})();