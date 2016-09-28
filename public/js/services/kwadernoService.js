app.service('kwadernoService', ['$resource', '$filter', '$mdDialog', '$mdToast', 'userService', function($resource, $filter, $mdDialog, $mdToast, user) {

    /*- RESOURCES -*/

    // Notebook
    this.notebookR= $resource('/api/notebook')

    // Note
    this.noteR = $resource('/api/note/:noteid', {}, { update: { method: 'PUT' } } );

    this.notebook = {
        id: null,
        callbacks: {}
    };

    var _this = this;

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

    
    // User Services
    this.user = user;

    /*-- SCOPE FUNCTIONS --*/

    // New Note
    this.noteDialog = function(noteid) {
        
        // Show Dialog
        $mdDialog.show({
            controller: NoteDialogController,
            templateUrl: 'templates/note-new.htm',
            fullscreen: true,
            locals: {
                notebookR: _this.notebookR,
                noteR: _this.noteR,
                user: _this.user,
                noteid: noteid
            }
        });

    };

    function NoteDialogController($scope, $mdDialog, $mdToast, notebookR, noteR, user, noteid) {

        /*-- SCOPE VARIABLES --*/
        if (!noteid) {
            // Note
            $scope.note = {
                tags: [],
                author: user.user
            }
        } else {
            $scope.note = noteR.get( {noteid: noteid} );
        }

        // Notebooks
        $scope.notebooks = notebookR.query();

        /*-- SCOPE FUNCTIONS --*/

        // CANCEL
        $scope.cancel = $mdDialog.hide;

        // SAVE
        $scope.save = function() {

            // Show Progress Circular
            $scope.progressShow = true;

            var noteI = null;

            // SAVE Note
            if (noteid) {
                noteI = noteR.update({noteid: noteid}, $scope.note);    
            } else {
                noteI = noteR.save($scope.note);
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