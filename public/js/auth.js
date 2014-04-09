'use strict';

angular.module('auth', [])
.controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
    $scope.login = function() {
    	var postData = {domain: $scope.domain, username: $scope.username, password: $scope.password};
    	$http.post('/login', postData).success(loginSuccess).error(loginError);

        function loginSuccess(data, status, headers, config) {
        	console.log('status: ' + status);
        	if (status < 300) {
        		console.log('tokenId: ' + data.tokenId);
        		$rootScope.token = data.tokenId;
        		
        		// add a token header to all jQuery ajax calls
        		$.ajaxSetup({
        		    beforeSend: function(xhr) {
        		        xhr.setRequestHeader('x-auth-token', $rootScope.token);
        		    }
        		});
	        	
        		// display home page
        		$location.path('/');
        	} else {
        		console.log('login failure: ' + data);
        		error('Login failure!');
        	}
        };
        function loginError(data, status, headers, config) {
        	console.log('login failure: ' + data.error.message);
        	error('Login failure: ' + data.error.message);
        };
    };
}]);
