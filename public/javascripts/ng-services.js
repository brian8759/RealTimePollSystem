"use strict";
// create a new service 'Poll'
var pollServices = angular.module('pollServices', ['ngResource']);

pollServices.factory('Poll', function($resource) {
	return $resource('polls/:pollId', {}, {
		query: {
			method: 'GET', params: { pollId: 'polls' }, isArray: true
		}
	});
});
