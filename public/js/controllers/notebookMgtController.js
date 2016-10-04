angular.module('kwaderno')
    .controller('notebookMgtController', notebookMgtController);

notebookMgtController.$inject = ['dataService'];

function notebookMgtController(ds) {

    var vm = this;

    // Set Toolbar Title
    ds.emit('toolbarTitle', ' - Manage Notebooks');

}