// Angular app module
"use strict";

// define an angular app 'polls', and inject the dependencies
var polls = angular.module('polls', ['ngRoute', 'ui.bootstrap', 'pollControllers', 'pollServices']);

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

polls.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/*
polls.filter('hasQuestion', function() {
	return function(input, query) {
		// check every element in input to see if query is a substring of question
		var output = [];
		for(i in input) {
			var question = input[i].question;
			if(question.indexOf(query) > -1) {
				output.push(input[i]);
			}
		}
		return output;
	}
});
*/

