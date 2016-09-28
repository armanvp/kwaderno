app.controller('note', ['$scope', '$resource', '$mdDialog', 'kwadernoService', function($scope, $resource, $mdDialog, ks) {

    $scope.prettyDate = ks.prettyDate;

    var notesR = $resource('/api/notebook/:notebookid/notes');
    
    ks.registerCallback('selectNotebook', function(param) {
        $scope.notes = notesR.query({notebookid: param});
    });

    $scope.selectNote = ks.noteDialog;
    
    function test(ev,id) {

        console.log(ev);

    var noteR = $resource('/api/note/:noteid', { noteid: id }, { update: { method: 'PUT' } });
    $scope.note = noteR.get({noteid: id});
    $scope.saveNote = function(id) {
        
        noteR.update($scope.note);
        $scope.note = noteR.get({noteid: id});
        //$scope.note.update();

    };

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/note.htm',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
          note: $scope.note,
          saveNote: $scope.saveNote
      },
      fullscreen: true
    })
    .then(function(save) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog, note, saveNote) {

      $scope.note = note;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.save = function() {
        saveNote();
        $mdDialog.hide();
    }

  }

}]);