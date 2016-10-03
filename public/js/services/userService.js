app.service('userService', ['$resource', function($resource) {

    var user = {
        email: 'arman.jay@gmail.com'
    };

    var services = {
        getUser: getUser
    };

    function getUser() {
        return user;
    }

}]);