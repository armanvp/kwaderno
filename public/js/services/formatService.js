angular
    .module('kwaderno')
    .service('formatService', FormatService);

FormatService.$inject = ['$filter'];

function FormatService($filter) {

    var services = {
        prettyDate: prettyDate
    };

    return services;

    function prettyDate(date) {
        return $filter('date')(date, 'medium');
    }

}