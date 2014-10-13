"use strict";

var pollControllers = angular.module('pollControllers', ['ngAnimate']);

// the controller for listing all polls in the database
pollControllers.controller('PollListController', ['$scope', 'Poll', 
  function($scope, Poll) {
    $scope.polls = Poll.query();
}]);

// the controller for listing the detail info of certain poll
pollControllers.controller('PollDetailsController', ['$scope', '$routeParams', 'Poll', 
  function($scope, $routeParams, Poll) {
    $scope.poll = Poll.get({ pollId: $routeParams.pollId });
}]);

// the controller for creating a new poll
pollControllers.controller('CreateNewPollController', ['$scope', '$location', 'Poll', 
  function($scope, $location, Poll) {
    // define an poll object
    $scope.poll = {
      question: '',
      // because a meaningful question at least needs to have two choices
      choices: [ { text: '' }, { text: '' } ]
    };
    // define a method
    $scope.addChoice = function() {
      $scope.poll.choices.push({ text: '' });
    };

    // save this new poll object to MongoDB
    $scope.createPoll = function() {
      var poll = $scope.poll;
      // check question first
      if(poll.question.length <= 0) {
        alert('You must enter a valid question!');
      } else {
        var newPoll = new Poll(poll);
        newPoll.$save(function(res, resp) {
          if(!res.error) {
            $location.path('polls');
          } else {
            alert('Error, can\'t save it into MongoDB');
          }
        });
      }
    };
}]);