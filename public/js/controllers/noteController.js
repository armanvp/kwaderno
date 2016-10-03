app.controller('note', ['$scope', '$resource', '$mdToast', 'kwadernoService', 'dataService', 'progressService', 'formatService', 'dialogService', 'logService', function($scope, $resource, $mdToast, ks, ds, ps, fs, dgs, ls) {

    var vm = this;
    vm.notes = [];
    vm.prettyDate = fs.prettyDate;
    vm.selectNote = selectNote;

    onLoad();

    function onLoad() {
        ds.on('selectNotebook', selectNotebook);
        ds.on('saveNote', saveNote);
    }
    
    function selectNotebook(event, params) {
        ps.showProgress('main');
        ds.getNotes(params)
            .then(function(data) {
                vm.notes = data;
                vm.notes.sort(ds.sortNoteFn);
                ps.hideProgress('main');
            })
            .catch(function(error) {
                ls.log('E', 'Unable to select the notebook');
                ps.hideProgress('main');
            });
    }

    function selectNote(params) {
        dgs.showNoteDialog(params);
    }

    function saveNote(event, note) {

        var item = vm.notes.find(function(item, idx) {
            if(item._id === note._id) {
                vm.notes[idx] = note;
                return true;
            }
            return false;
        });

        if (!item) {
            vm.notes.push(note);
        }

        vm.notes.sort(ds.sortNoteFn);

    }

}]);