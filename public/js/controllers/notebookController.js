app.controller('notebook', ['$resource', '$mdToast', 'logService', 'kwadernoService', 'dataService', 'progressService', '$routeParams', function($resource, $mdToast, ls, ks, ds, ps, $routeParams) {

    var vm = this;
    vm.selectNotebook = selectNotebook;
    vm.selectNotebookMgt = selectNotebookMgt;
    vm.save = save;
    vm.del = deleteNotebook;
    vm.selectedNotebook = {
        name: '',
        description: ''
    };

    onLoad();

    function onLoad() {
        if($routeParams.action === 'new') {
            vm.selectedNotebook.name = 'Untitled';
            vm.selectedNotebook.description = 'New Notebook';
        }

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

        if(vm.selectedNotebook._id) {

        ds.updateNotebook(vm.selectedNotebook)
            .then(function(data) {
                ls.log('S','Notebook was successfully updated');
                ps.hideProgress('main');
            })
            .catch(function(error) {
                ls.log('E', 'Error updating the notebook');
                ps.hideProgress('main');
            });

        } else {

        ds.createNotebook(vm.selectedNotebook)
            .then(function(data) {
                vm.notebooks.push(data);
                ls.log('S','Notebook was successfully saved');
                ps.hideProgress('main');
            })
            .catch(function(error) {
                ls.log('E', 'Error saving the notebook');
                ps.hideProgress('main');
            });

        }
    }

    function deleteNotebook() {

        ds.noteExistsInNotebook(vm.selectedNotebook._id)
            .then(function(data) {
                if(data._id !== undefined) {
                    return new Promise(function(resolve, reject) {
                        reject('Notebook with notes cannot be deleted');
                    });
                } else {
                    return ds.deleteNotebook(vm.selectedNotebook._id);
                }
            })
            .then(function(data) {
                vm.notebooks.find(function(e,i,t) {
                    if(e._id === data._id) {
                        vm.notebooks.splice(i,1);
                        return true;
                    }
                    return false;
                });
                ls.log('S', 'Notebook was successfully deleted');
            })
            .catch(function(error) {
                ls.log('E', error);
            });
    }

}]);