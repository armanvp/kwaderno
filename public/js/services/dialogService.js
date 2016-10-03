angular
    .module('kwaderno')
    .service('dialogService', DialogService);

DialogService.$inject = ['$mdDialog', 'dataService', 'logService', 'progressService', 'userService', 'formatService', 'kwadernoService'];

function DialogService($mdDialog, ds, ls, ps, us, fs, ks) {

    var note = {};
    var notebooks = [];
    var readOnly = true;

    var services = {
        showNoteDialog: showNoteDialog,
    };

    return services;

    function showNoteDialog(noteId) {
        
        var deletedNb = ks.getSystemNotebook('Deleted');
        notebooks = [];

        ps.showProgress('main');
        // Get Notebooks
        ds.getNotebooks()
            // Successfully retrieved notebooks
            .then(function(data) {
                notebooks = data;
                // Determine if Change or New Note
                if(noteId) {
                    // Retrieve Note
                    readOnly = true;
                    return ds.getNote(noteId);
                } else {
                    // Set Note defaults
                    readOnly = false;
                    return new Promise(function(resolve, reject) {
                        resolve({tags: [], author: us.email});
                    });
                }
            })
            // Successfully retrieved Notes or a New Note
            .then(function(data) {
                    note = data;

                    if(note._id !== undefined && note.notebook === deletedNb._id) {

                    } else {
                        notebooks.find(function(e,i) {
                            if (e._id === deletedNb._id) {
                                notebooks.splice(i,1);
                                return true;
                            } else {
                                return false;
                            }
                        })
                    }

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
                                ps: ps,
                                fs: fs,
                                readOnly: readOnly,
                                deletedNb: deletedNb
                            }
                        });
            })
            // Error occured
            .catch(function(error) {
                ls.log('E', 'Error selecting note');
                ps.hideProgress('main');
            });

    }

    function NoteDialogController($scope, $mdDialog, ds, ls, notebooks, note, ps, fs, readOnly, deletedNb) {

        $scope.cancel = $mdDialog.hide;
        $scope.save = saveNote;
        $scope.getProgress = ps.getProgress;
        $scope.isReadOnly = isReadOnly;
        $scope.change = changeMode;
        $scope.prettyDate = fs.prettyDate;
        $scope.del = deleteNote;

        onLoad();

        function onLoad() {
            $scope.notebooks = notebooks;
            $scope.note = note;
            $scope.readOnly = readOnly;
            $scope.notebook = notebooks.find(function(e) {
                return e._id === note.notebook
            });
        }

        function saveNote() {

            ps.showProgress('note');
            if(note._id) {
                ds.updateNote(note)
                    .then(function(data) {
                        ls.log('S', 'Note was updated');
                        ds.emit('saveNote', data);
                        ps.hideProgress('note');
                        changeMode();

                        $scope.notebook = notebooks.find(function(e) {
                            return e._id === note.notebook
                        });
                        //return $mdDialog.hide();
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
                        changeMode();

                        $scope.notebook = notebooks.find(function(e) {
                            return e._id === note.notebook
                        });
                        //return $mdDialog.hide();
                    })
                    .catch(function(error) {
                        ls.log('E', 'Error saving note');
                        ps.hideProgress('note');
                    });
            }
        }

        function deleteNote() {

            if(note._id) {
                note.notebook = deletedNb;
                ds.updateNote(note)
                    .then(function(data) {
                        ls.log('S', 'Note was deleted');
                        ds.emit('saveNote', data);
                        ps.hideProgress('note');

                        $scope.notebook = notebooks.find(function(e) {
                            return e._id === note.notebook
                        });
                        return $mdDialog.hide();
                    })
                    .catch(function(error) {
                        ls.log('E', 'Error saving note');
                        ps.hideProgress('note');
                    });
            }
/*
            $scope.note.$delete()
                .then(function(data) {
                    ls.log('S', 'Note was deleted');
                    ds.emit('deleteNote', $scope.note._id);
                    ps.hideProgress('note');
                    return $mdDialog.hide();
                })
                .catch(function(error) {
                    ls.log('E', 'Error deleting note');
                    ps.hideProgress('note');
                });
*/
        }

        function isReadOnly() {
            return readOnly;
        }

        function changeMode() {
            readOnly = !readOnly;
        }

    }

}
