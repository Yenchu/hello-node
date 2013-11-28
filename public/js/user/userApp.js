'use strict';

angular.module('userApp', ['userControllers'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/users', {templateUrl: '/partials/user/users.html', controller: 'QueryUsersCtrl'}).
        when('/users/:id', {templateUrl: '/partials/user/user.html', controller: 'EditUserCtrl'}).
        when('/user', {templateUrl: '/partials/user/user.html', controller: 'AddUserCtrl'}).
        otherwise({redirectTo: '/users'});
}]);
