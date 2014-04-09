'use strict';

angular.module('app', ['ngRoute', 'bsDirectives', 'auth', 'home', 'user', 'cluster'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'}).
        when('/login.html', {templateUrl: '/partials/login.html', controller: 'LoginCtrl'}).
        when('/users.html', {templateUrl: '/partials/user/users.html', controller: 'UserCtrl'}).
        when('/users-grid.html', {templateUrl: '/partials/user/users-grid.html', controller: 'UserGridCtrl'}).
        when('/clusters.html', {templateUrl: '/partials/cluster/clusters.html', controller: 'ClusterCtrl'}).
        otherwise({redirectTo: '/'});
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}])
.factory('authInterceptor', ['$rootScope', '$location', '$q', function ($rootScope, $location, $q) {
    return {
        request: function(config) {
            console.log('path: ' + config.url);
            if (!$rootScope.token) {
            	$location.path('/login.html');
            }
            
            // add a token header to all angularJS http request
            config.headers['x-auth-token'] = $rootScope.token;
            return config || $q.when(config);
        },
        responseError: function(rejection) {
        	if (rejection.status === 401 && $location.path() != '/login.html') {
        		$rootScope.token = null;
        		$location.path('/login.html');
        	}
        	return $q.reject(rejection);
        }
    };
}])
.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(path) {
        return path === $location.path();
    };
}]);
