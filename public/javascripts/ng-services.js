"use strict";
// create a new service 'Poll'
var pollServices = angular.module('pollServices', ['ngResource']);

/*  Create a Poll service to do CRUD operations with backend  */
pollServices.factory('Poll', function($resource) {
	/*
	return $resource('pollTest/:pollId', {}, {
		//define a query method to retrieve all polls in DB
		query: {
			method: 'GET', params: { pollId: 'polls' }, isArray: true
		}
	});
	*/
	return $resource('pollTest/:pollId'); // it has get(), query(), save(), put(), delete() five methods!
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