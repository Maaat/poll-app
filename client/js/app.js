window.$ = window.jQuery = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

var app = angular.module('pollApp', ['ui.router','ui.bootstrap']);

//global controllers and directives
app.controller('userCtrl', require('./controllers/userCtrl'));
app.controller('discussionCtrl', require('./controllers/discussionCtrl'));

app.config(['$stateProvider','$urlRouterProvider', '$locationProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('polls', {
			url: '/polls',
			controller: require('./controllers/pollListCtrl'),
			templateUrl: 'views/polls/polls.html'
		})
		.state('newPoll', {
			url: '/polls/new',
			controller: require('./controllers/newPollCtrl'),
			templateUrl: 'views/polls/newPoll.html'
		})
		.state('poll', {
			url: '/polls/:id',
			controller: require('./controllers/pollCtrl'),
			templateUrl: 'views/polls/poll.html'
		})
		.state('user', {
			url: '/users/:name',
			controller: require('./controllers/userViewCtrl'),
			templateUrl: 'views/users/user.html'
		})
	;

	$locationProvider.html5Mode(true);
	
}]);