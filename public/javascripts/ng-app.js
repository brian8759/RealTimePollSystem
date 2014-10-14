// Angular app module
"use strict";

// define an angular app 'polls', and inject the dependencies
var polls = angular.module('polls', ['ngRoute', 'pollControllers', 'pollServices']);

// define some deep-linking routes, in the ng-controllers.js, we need to define those 
// controllers, actually, these three routers are corresponding to three different states
// once we enter one state, we use corresponding view and controller
polls.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/polls', {
		templateUrl: 'partials/listAllPolls.html',
		controller: 'PollListController'
	}).
	when('/poll/:pollId', {
		templateUrl: 'partials/details.html',
		controller: 'PollDetailsController'
	}).
	when('/new', {
		templateUrl: 'partials/newPoll.html',
		controller: 'CreateNewPollController'
	}).
	otherwise({
		redirectTo: '/polls'
	});
}]);
