app.service('kwadernoService', ['$resource', '$filter', '$mdDialog', '$mdToast', 'userService', function($resource, $filter, $mdDialog, $mdToast, user) {

    var _this = this;
    this.notebooks = [];
    this.notes = [];

    /*-- RESOURCES --*/
    this.notebookR= $resource('/api/notebook/:notebookid/:notes')
    this.noteR = $resource('/api/note/:noteid', {}, { update: { method: 'PUT' } } );

    /*-- DATA Services --*/
    this.data = {
        notebook: function get(params,options) {
            
        } 
    }

    this.notebook = {
        id: null,
        callbacks: {}
    };

    this.registerCallback = function(event, cb) {
        _this.notebook.callbacks[event] = cb;
    }

    this.callCallback = function(event, param) {
        _this.notebook.callbacks[event](param);
    }

    this.prettyDate = function(date) {
        return $filter('date')(date,'medium');
    }

    // TESTING


    /*-- SCOPE VARIABLES --*/

    this.noteFn = {
        save: this.noteR.save,
        update: this.noteR.update
    };
    
    // User Services
    this.user = user;

    /*-- SCOPE FUNCTIONS --*/

    // noteDialogShow - Calls the Note Dialog Box for Create, Read, Update, and Delete
    this.noteDialog = function(noteid) {

        // Show main progress bar
        _this.callCallback('progress',true);

        // Get list of Notebooks
        notebooks = _this.notebookR.query();

        // Determine if noteid was specified
        if (noteid) {
            // Select the specified noteId
            note = _this.noteR.get( {noteid: noteid} );
            note.$promise
                // Note successfully selected
                .then(function(result) {
                    $mdDialog.show({
                        controller: NoteDialogController,
                        templateUrl: 'templates/note-new.htm',
                        fullscreen: true,
                        locals: {
                            notebooks: notebooks,
                            note: note,
                            noteFn: _this.noteFn
                        }
                    })
                    .then(function(result) {
                        _this.callCallback('progress',false);
                    });
                })
                // Note cannot be selected
                .catch(function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error opening the note')
                            .hideDelay(3000)
                    );
                    _this.callCallback('progress',false);
                });

        } else {
            // Set Defaults
            note = { updateDate: new Date() };
            // Show new note
            $mdDialog.show({
                controller: NoteDialogController,
                templateUrl: 'templates/note-new.htm',
                fullscreen: true,
                locals: {
                    notebooks: notebooks,
                    note: note,
                    noteFn: _this.noteFn
                }
            })
            .then(function(result) {
                _this.callCallback('progress',false);
            });
        }

    };

    function NoteDialogController($scope, $mdDialog, $mdToast, notebooks, note, noteFn) {

        $scope.notebooks = notebooks;
        $scope.note = note;

        /*-- SCOPE FUNCTIONS --*/

        // CANCEL
        $scope.cancel = $mdDialog.hide;

        // SAVE
        $scope.save = function() {

            // Show Progress Circular
            $scope.progressShow = true;

            var noteI = null;

            // SAVE Note
            if (note._id) {
                noteI = noteFn.update({noteid: note._id}, $scope.note);    
            } else {
                noteI = noteFn.save($scope.note);
            }

            // Determine result
            noteI.$promise

                // SAVE - Success
                .then(function(result) {
                    // Hide Progress Circular
                    $scope.progressShow = false;
                    // Hide Dialog
                    $mdDialog.hide();
                    // Show Success Toast
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Note saved')
                            .hideDelay(3000)
                    );
                })

                // SAVE - Error
                .catch(function(error) {
                    // Hide Progress Circular
                    $scope.progressShow = false;
                    // Show Error Toast
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error saving the note')
                            .hideDelay(3000)
                    );
                });

        }

    }

 
}]);