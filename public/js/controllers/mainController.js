app.controller('main', ['$scope', 'kwadernoService', function($scope, ks) {

    $scope.newNote = ks.noteDialog;

}]);
