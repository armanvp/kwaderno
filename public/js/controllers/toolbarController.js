app.controller('toolbar', ['kwadernoService', 'dataService', 'progressService', 'dialogService', function(ks, ds, ps, dgs) {

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

        ds.on('toolbarTitle', changeToolbarTitle);
    }

    function changeToolbarTitle(event, title) {
        vm.toolbarTitle = title;
    }

}]);
