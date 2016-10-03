app.controller('main', ['kwadernoService', 'dataService', 'progressService', 'dialogService', function(ks, ds, ps, dgs) {

    var vm = this;
    vm.getProgress = ps.getProgress;
    vm.newNote = dgs.showNoteDialog;

    onLoad();

    function onLoad() {
        ps.showProgress('main');    
        ks.loadConfig()
            .then(function() {
                ps.hideProgress('main');
            })
            .catch(function(error) {
                ps.hideProgress('main');
            });
    }


/*
    $scope.newNote = ks.noteDialog;

    // Register Callback for updateing progress bar
    ks.registerCallback('progress', function(progressShow) {
        $scope.progressShow = progressShow;
    });
*/
}]);
