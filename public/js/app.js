'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addCompany', {
        templateUrl: 'partials/addCompany',
        controller: AddCompanyCtrl
      }).
      when('/readCompany/:id', {
        templateUrl: 'partials/readCompany',
        controller: ReadCompanyCtrl
      }).
      when('/editCompany/:id', {
        templateUrl: 'partials/editCompany',
        controller: EditCompanyCtrl
      }).
      when('/deleteCompany/:id', {
        templateUrl: 'partials/deleteCompany',
        controller: DeleteCompanyCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);