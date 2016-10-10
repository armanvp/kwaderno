var app = angular.module('kwaderno', ['ngMaterial', 'ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
        // Main Page
        .when('/', {
            controller: 'mainController',
            templateUrl: 'pages/main.htm'
        })
        // Notebook Management Page
        .when('/notebook/', {
            controller: 'notebookMgtController',
            templateUrl: 'pages/notebook.htm'
        })
        // Notebook Management Page
        .when('/notebook/:action', {
            controller: 'notebookMgtController',
            templateUrl: 'pages/notebook.htm'
        });
        
}]);