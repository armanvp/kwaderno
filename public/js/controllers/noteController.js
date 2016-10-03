app.controller('note', ['$scope', '$resource', '$mdToast', 'kwadernoService', 'dataService', 'progressService', 'formatService', 'dialogService', 'logService', function($scope, $resource, $mdToast, ks, ds, ps, fs, dgs, ls) {

    var vm = this;
    vm.notes = [];
    vm.prettyDate = fs.prettyDate;
    vm.selectNote = selectNote;

    onLoad();

    function onLoad() {
        ds.on('selectNotebook', selectNotebook);
        ds.on('saveNote', saveNote);
        ds.on('deleteNote', deleteNote);
    }
    
    function selectNotebook(event, params) {
        ps.showProgress('main');
        vm.notebookId = params;
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
                if(vm.notebookId === note.notebook) {
                    vm.notes[idx] = note;
                } else {
                    vm.notes.splice(idx, 1);
                }
                
                return true;
            }
            return false;
        });

        if (!item) {
            if (vm.notebookId === note.notebook) {
                vm.notes.push(note);
            } 
        }

        vm.notes.sort(ds.sortNoteFn);

    }

    function deleteNote(event, noteId) {
        vm.notes.find(function(item, idx) {
            if (item._id === noteId) {
                vm.notes.splice(idx, 1);
                return true;
            } else {
                return false;
            }
        });
    }

}]);