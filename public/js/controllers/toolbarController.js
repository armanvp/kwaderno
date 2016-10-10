app.controller('toolbar', ['$location', 'kwadernoService', 'dataService', 'progressService', 'dialogService', function($location, ks, ds, ps, dgs) {

    var vm = this;
    vm.getProgress = ps.getProgress;
    vm.newNote = dgs.showNoteDialog;
    vm.newNotebook = newNotebook;
    vm.openMenu = function($mdOpenMenu,ev) {
        $mdOpenMenu(ev);
    }

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

    function newNotebook() {
        $location.path("/notebook/new");
    }

}]);
