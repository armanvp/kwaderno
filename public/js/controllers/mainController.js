angular.module('kwaderno')
    .controller('mainController', mainController);

mainController.$inject = ['dataService'];

function mainController(ds) {

    // Clear Toolbar Title
    ds.emit('toolbarTitle', '');

}