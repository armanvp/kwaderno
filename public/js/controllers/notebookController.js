app.controller('notebook', ['$resource', '$mdToast', 'logService', 'kwadernoService', 'dataService', 'progressService', function($resource, $mdToast, ls, ks, ds, ps) {

    var vm = this;
    vm.selectNotebook = selectNotebook;
    vm.selectNotebookMgt = selectNotebookMgt;
    vm.save = save;

    onLoad();

    function onLoad() {
        return ds.getNotebooks()
            .then(function(data) {
                vm.notebooks = data;
            })
            .catch(function(error) {
                ls.log('E', 'Cannot load notebooks');
            });
    }

    function selectNotebook(notebookId) {
        ds.emit('selectNotebook', notebookId);
    }

    function selectNotebookMgt(notebook) {
        vm.selectedNotebook = notebook;
    }

    function save() {
        ps.showProgress('main');
        ds.updateNotebook(vm.selectedNotebook)
            .then(function(data) {
                ls.log('S','Notebook was successfully updated');
                ps.hideProgress('main');
            })
            .catch(function(error) {
                ls.log('E', 'Error updating the notebook');
                ps.hideProgress('main');
            });
    }

/*
    $scope.selectNotebook = function(id) {
        ks.callCallback('selectNotebook',{id:id, toast:$mdToast});
    }
*/
}]);