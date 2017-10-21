angular.module('bomboka')
    .directive('file', UploadImageDirective);

function UploadImageDirective() {
    return {
        require:"ngModel",
        restrict: 'A',
        link: function($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                console.log("uploading file");
                console.log(file);
                $scope.userImage = file;
                ngModel.$setViewValue(file);
                $scope.$apply();
            });
        }
    };
}