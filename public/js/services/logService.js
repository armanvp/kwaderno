angular
    .module('kwaderno')
    .service('logService', LogService);

LogService.$inject = ['$mdToast'];

function LogService($mdToast) {

    var services = {
        log: log
    };

    return services;

    function log(type,msg) {                      
        $mdToast.show(
            $mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                .position('top')  
                
        );
        console.log(type + '->' + msg);
    }

}