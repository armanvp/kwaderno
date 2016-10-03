angular
    .module('kwaderno')
    .service('dialogService', DialogService);

DialogService.$inject = ['$mdDialog', 'dataService', 'logService', 'progressService', 'userService'];

function DialogService($mdDialog, ds, ls, ps, us) {

    var note = {};
    var notebooks = [];

    var services = {
        showNoteDialog: showNoteDialog
    };

    return services;

    function showNoteDialog(noteId) {

        ps.showProgress('main');
        // Get Notebooks
        ds.getNotebooks()
            // Successfully retrieved notebooks
            .then(function(data) {
                notebooks = data;
                // Determine if Change or New Note
                if(noteId) {
                    // Retrieve Note
                    return ds.getNote(noteId);
                } else {
                    // Set Note defaults
                    return new Promise(function(resolve, reject) {
                        resolve({tags: [], author: us.email});
                    });
                }
            })
            // Successfully retrieved Notes or a New Note
            .then(function(data) {
                    note = data;
                    ps.hideProgress('main');
                    return $mdDialog.show({
                            controller: NoteDialogController,
                            templateUrl: 'templates/note.htm',
                            fullscreen: true,
                            locals: {
                                note: note,
                                notebooks: notebooks,
                                ds: ds,
                                ls: ls,
                                ps: ps
                            }
                        });
            })
            // Error occured
            .catch(function(error) {
                ls.log('E', 'Error selecting note');
                ps.hideProgress('main');
            });

    }

    function NoteDialogController($scope, $mdDialog, ds, ls, notebooks, note, ps) {

        $scope.cancel = $mdDialog.hide;
        $scope.save = saveNote;
        $scope.getProgress = ps.getProgress;

        onLoad();

        function onLoad() {
            $scope.notebooks = notebooks;
            $scope.note = note;
        }

        function saveNote() {

            ps.showProgress('note');
            if(note._id) {
                ds.updateNote(note)
                    .then(function(data) {
                        ls.log('S', 'Note was updated');
                        ds.emit('saveNote', data);
                        ps.hideProgress('note');
                        return $mdDialog.hide();
                    })
                    .catch(function(error) {
                        ls.log('E', 'Error saving note');
                        ps.hideProgress('note');
                    });
            } else {
                ds.createNote(note)
                    .then(function(data) {
                        ls.log('S', 'Note was created');
                        ds.emit('saveNote', data);
                        ps.hideProgress('note');
                        return $mdDialog.hide();
                    })
                    .catch(function(error) {
                        ls.log('E', 'Error saving note');
                        ps.hideProgress('note');
                    });
            }
        }

    }

}
