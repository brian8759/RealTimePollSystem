"use strict";
// create a new service 'Poll'
var pollServices = angular.module('pollServices', ['ngResource']);

pollServices.factory('Poll', function($resource) {
	return $resource('pollTest/:pollId', {}, {
		//define a query method
		query: {
			method: 'GET', params: { pollId: 'polls' }, isArray: true
		}
		//in the future, we can define more methods, such as update, delete
	});
});

pollServices.factory('Socket', function($rootScope) {
	var socket = io.connect();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});