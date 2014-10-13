"use strict";

var pollControllers = angular.module('pollControllers', ['ngAnimate']);

pollControllers.controller('PollListController', ['$scope', 'Poll', function($scope, Poll) {
  $scope.polls = Poll.query();
}]);

pollControllers.controller('PollDetailsController', ['$scope', '$routeParams', 'Poll', 
  function($scope, $routeParams, Poll) {
    $scope.poll = Poll.get({ pollId: $routeParams.pollId });
}]);

