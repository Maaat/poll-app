var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

var app = angular.module('pollApp', ['ui.router','ui.bootstrap']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
	;
}]);