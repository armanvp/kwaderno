app.controller('notebook', ['$scope', '$resource', '$mdToast', 'kwadernoService', function($scope, $resource, $mdToast, ks) {

    $scope.notebooks = ks.notebookR.query();

    $scope.selectNotebook = function(id) {
        ks.callCallback('selectNotebook',{id:id, toast:$mdToast});
    }

}]);