'use strict';

angular.module('user', ['ngResource'])
.factory('UserService', ['$resource', function($resource) {
    return $resource(
        '/users/:id', 
        {id: '@id'}, 
        {'update': {method: 'PUT'}}
    );
}])
.controller('UserCtrl', ['$scope', '$location', 'UserService', function($scope, $location, User) {
	console.log('list user');
    $scope.users = User.query();
    
    $scope.openEditModal = function(user) {
    	if (user != null) {
    		console.log('updating user ' + user.name);
    		$scope.user = user;
    	} else {
    		console.log('adding user');
    		$scope.user = new User();
    	}
    };
    $scope.save = function() {
    	if ($scope.user._id) {
    		console.log('updated user ' + $scope.user.name);
    		$scope.user.$update(
    	        {id: $scope.user._id}, 
    	        saveSuccess,
    	        saveError
    	    );
    	} else {
    		console.log('added user ' + $scope.user.name);
    	    $scope.user.$save(
    	        {}, 
    	        saveSuccess,
    	        saveError
    	    );
    	}
    };
    
    $scope.openRemoveModal = function(user) {
    	console.log('removing user ' + user.name);
    	$scope.user = user;
    };
    $scope.remove = function() {
    	console.log('removed user ' + $scope.user.name);
    	var user = $scope.user;
        $scope.user = null;
        user.$remove(
            {id: user._id}, 
            removeSuccess,
            removeError
        );
    };
    
    function saveSuccess(value, responseHeaders) {
    	$scope.users = User.query();
    }
    
    function saveError(httpResponse) {
    	console.log('edit error: ' + httpResponse);
        $location.path('/users.html');
    }
    
    function removeSuccess(value, responseHeaders) {
    	$scope.users = User.query();
    }
    
    function removeError(httpResponse) {
    	console.log('remove error: ' + httpResponse);
        $location.path('/users.html');
    }
}])
.controller('UserGridCtrl', ['$scope', '$location', function($scope, $location) {
	console.log('grid user');
}]);
