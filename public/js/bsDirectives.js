'use strict';

angular.module('bsDirectives', [])
/*.directive('bsInput', function() { //! not compl.
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            label: '@' 
        },
        templateUrl: '/templates/bs-input.html'
    };
})*/
.directive('bsModal', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
        	modalId: '@',
            title: '@',
            okTxt: '@',
            okFn: '&',
            cancelTxt: '@',
            cancelFn: '&'
        },
        templateUrl: '/templates/bs-modal.html'
    };
})
.directive('bsTabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function(pane) {
                if (panes.length == 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        },
        templateUrl: '/templates/bs-tabs.html'
    };
})
.directive('bsPane', function() {
    return {
        require: '^bsTabs',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@' 
        },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        templateUrl: '/templates/bs-pane.html'
    };
})
.directive('bsListGroup', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var list = $scope.list = [];

            $scope.select = function(item) {
                angular.forEach(list, function(item) {
                    item.selected = false;
                });
                item.selected = true;
            };

            this.addItem = function(item) {
                if (list.length == 0) {
                    $scope.select(item);
                }
                list.push(item);
            };
        },
        templateUrl: '/templates/bs-list-group.html'
    };
})
.directive('bsListGroupItem', function() {
    return {
        require: '^bsListGroup',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function(scope, element, attrs, listGroupCtrl) {
        	listGroupCtrl.addItem(scope);
        },
        templateUrl: '/templates/bs-list-group-item.html'
    };
});
