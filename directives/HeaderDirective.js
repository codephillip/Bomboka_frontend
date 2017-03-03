angular.module('bomboka')
    .directive('headerDirective', HeaderDirective);

function HeaderDirective() {
    return {
        templateUrl: 'templates/header.html'
    };
}