'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
    $http.post('/companies').
    success(function(data, status, headers, config) {
        $scope.companies = data.companies;
    });
    $http.post('/companiessel').
    success(function(data, status, headers, config) {
        $scope.companiessel = data.companies;
    });
}

function AddCompanyCtrl($scope, $http, $location) {
    $scope.form = {};
    $http.post('/companiessel').
    success(function(data, status, headers, config) {
        $scope.companies = data.companies;
    });

    $scope.submitCompany = function () {
        $http.post('/company', $scope.form).
        success(function(data) {
            $location.path('/');
        });
    };
}

function ReadCompanyCtrl($scope, $http, $routeParams) {
    $http.get('/company/' + $routeParams.id).
    success(function(data) {
        $scope.company = data.company;
    });
}

function EditCompanyCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};

    $http.post('/companiessel').
    success(function(data, status, headers, config) {
        $scope.companies = data.companies;
    });

    $http.get('/company/' + $routeParams.id).
    success(function(data) {
        $scope.form = data.company;
    });

    $scope.editCompany = function () {
        $http.put('/company/' + $routeParams.id, $scope.form).
        success(function(data) {
            $location.url('/viewCompany/' + $routeParams.id);
        });
    };
}

function DeleteCompanyCtrl($scope, $http, $location, $routeParams) {
    $http.get('/company/' + $routeParams.id).
    success(function(data) {
        $scope.post = data.company;
    });

    $scope.deleteCompany = function () {
        $http.delete('/company/' + $routeParams.id).
        success(function(data) {
            $location.url('/');
        });
    };

    $scope.home = function () {
        $location.url('/');
    };
}
