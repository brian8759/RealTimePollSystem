"use strict";

var pollControllers = angular.module('pollControllers', ['ngAnimate']);

// the controller for listing all polls in the database
pollControllers.controller('PollListController', ['$scope', 'Poll', function($scope, Poll) {
  $scope.polls = Poll.query();
}]);

// the controller for listing the detail info of certain poll
pollControllers.controller('PollDetailsController', ['$scope', '$routeParams', 'Poll', 
  function($scope, $routeParams, Poll) {
    $scope.poll = Poll.get({ pollId: $routeParams.pollId });
}]);

// the controller for creating a new poll
pollControllers.controller('CreateNewPollController', ['$scope', ])