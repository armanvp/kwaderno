angular.module('kwaderno')
    .controller('notebookMgtController', notebookMgtController);

notebookMgtController.$inject = ['$routeParams', 'dataService'];

function notebookMgtController($routeParams, ds) {

    var vm = this;

    // Set Toolbar Title
    ds.emit('toolbarTitle', ' - Manage Notebooks');

}