angular.module('bomboka')
    .directive('searchDirective', SearchDirective);

function SearchDirective() {
    return {
        templateUrl: 'templates/search.html'
    };
}
