angular.module('bomboka')
    .controller('LoginController', LoginController);

LoginController.$inject = ['UserService', '$location', 'AuthenticationService', 'FlashService'];
function LoginController(UserService, $location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = login;
    vm.register = register;

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (response) {
            AuthenticationService.SetCredentials(vm.username, vm.password, response.data);
            $location.path('home');
        });
    }

    function register() {
        vm.dataLoading = true;
        UserService.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
}