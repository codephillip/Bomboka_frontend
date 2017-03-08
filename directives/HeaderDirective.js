angular.module('bomboka')
    .directive('headerDirective', HeaderDirective)
    .controller('HeaderController', HeaderController);

function HeaderDirective() {
    var hd =  {
        templateUrl: 'templates/header.html',
        controller: HeaderController,
        controllerAs: 'headctrl',
        bindToController: true
    };

    HeaderController.$inject = ['localStorageService', 'UserService'];
    function HeaderController(localStorageService) {
        var headctrl = this;
        headctrl.data = localStorageService.get('userObject');
    }
    return hd;
}