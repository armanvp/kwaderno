angular
    .module('kwaderno')
    .service('progressService', ProgressService);

function ProgressService() {

    var _this = this;
    this.progress = [];

    var services = {
        showProgress: showProgress,
        hideProgress: hideProgress,
        getProgress: getProgress
    };

    return services;

    function showProgress(id) {
        _this.progress[id] = true;
    }

    function hideProgress(id) {
        _this.progress[id] = false;
    }

    function getProgress(id) {
        return _this.progress[id] || false;
    }

}