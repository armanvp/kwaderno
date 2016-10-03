angular
    .module('kwaderno')
    .service('kwadernoService', kwadernoService);

kwadernoService.$inject = ['dataService', 'logService'];

function kwadernoService(ds,ls) {
     
     var _this = this;
     this.systemNotebooks = [];

     var services = {
         loadConfig: loadConfig,
         getSystemNotebook: getSystemNotebook
     };

     return services;

     function loadConfig() {

         return ds.getNotebooks()
            .then(function(data) {
                data.find(function(e,i) {
                    if(e.isSystem) {
                        _this.systemNotebooks.push(e);
                    }
                    return false;
                });
                return new Promise(function(resolve, reject) {
                    resolve();
                });
            })
            .catch(function(error) {
                ls.log('E', 'Error loading configuration');
            });
     }

     function getSystemNotebook(name) {
         return  _this.systemNotebooks.find(function(e,i) {
             return e.name === name;
         });
     }
}