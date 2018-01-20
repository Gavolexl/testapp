'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive("children-tree", function () {
        return {
            restrict: "A",
            templateUrl: "partials/childrentree.jade",
            transclude: true
        }
    });
