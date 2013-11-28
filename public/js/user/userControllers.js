'use strict';

angular.module('userControllers', ['userServices'])
.controller('QueryUsersCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {
    var users = User.query();
    $scope.users = users;
    $scope.title = 'User List';
    $scope.remove = function(user) {
        user.$remove({id: user._id}, function() {
	    $location.path('/users');
	});
    };
}])
.controller('EditUserCtrl', ['$scope', '$location', '$routeParams', 'User', function($scope, $location, $routeParams, User) {
    $scope.user = User.get({id:$routeParams.id});
    $scope.title = 'Edit User';
    $scope.save = function() {
        $scope.user.$update({id: $scope.user._id}, function() {
	    $location.path('/users');
	});
    };
}])
.controller('AddUserCtrl', ['$scope', '$location', 'User', function($scope, $location, User) {
    $scope.user = new User();
    $scope.title = 'Add User';
    $scope.save = function() {
        $scope.user.$save({}, function() {
	    $location.path('/users');
	});
    };
}]);
