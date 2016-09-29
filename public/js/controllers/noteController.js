app.controller('note', ['$scope', '$resource', '$mdToast', 'kwadernoService', function($scope, $resource, $mdToast, ks) {

    /*-- SCOPE Functions --*/
    $scope.prettyDate = ks.prettyDate;
    $scope.selectNote = ks.noteDialog;
    
    /*-- CALLBACK - On selecting a notebook --*/
    ks.registerCallback('selectNotebook', function(param) {
        // Set Main Progress Bar
        ks.callCallback('progress', true);
        // Get Notes on this notebook
        $scope.notes = ks.notebookR.query({notebookid: param.id, notes: 'notes'});
        // Determine result
        $scope.notes.$promise
            // Successfully retrieved the notes
            .then(function(result) {
                // Hide Progress Bar
                ks.callCallback('progress',false);
            })
            // Error retrieving the notes
            .catch(function(error) {
                // Show Toast Error message
                param.toast.show(
                        param.toast.simple()
                            .textContent('Error retrieving notes')
                            .hideDelay(3000)
                    );
                // Hide Progress Bar                    
                ks.callCallback('progress',false);
            });
    });

}]);