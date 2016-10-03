app.controller('main', ['kwadernoService', 'dataService', 'progressService', 'dialogService', function(ks, ds, ps, dgs) {

    var vm = this;
    vm.getProgress = ps.getProgress;

    onLoad();

    function onLoad() {
        vm.newNote = dgs.showNoteDialog;
    }


/*
    $scope.newNote = ks.noteDialog;

    // Register Callback for updateing progress bar
    ks.registerCallback('progress', function(progressShow) {
        $scope.progressShow = progressShow;
    });
*/
}]);
