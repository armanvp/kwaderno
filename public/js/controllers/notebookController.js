app.controller('notebook', ['$resource', '$mdToast', 'logService', 'kwadernoService', 'dataService', 'progressService', function($resource, $mdToast, ls, ks, ds, ps) {

    var vm = this;
    vm.selectNotebook = selectNotebook;

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

/*
    $scope.selectNotebook = function(id) {
        ks.callCallback('selectNotebook',{id:id, toast:$mdToast});
    }
*/
}]);