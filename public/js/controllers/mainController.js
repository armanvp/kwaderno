app.controller('main', ['$scope', 'kwadernoService', function($scope, ks) {

    $scope.newNote = ks.noteDialog;

    // Register Callback for updateing progress bar
    ks.registerCallback('progress', function(progressShow) {
        $scope.progressShow = progressShow;
    });

}]);
