app.controller('notebook', ['$scope', '$resource', 'kwadernoService', function($scope, $resource, ks) {

    var notebooksR = $resource('/api/notebook');
    $scope.notebooks = notebooksR.query();

    $scope.selectNotebook = function(id) {
        ks.callCallback('selectNotebook',id);
    }

}]);