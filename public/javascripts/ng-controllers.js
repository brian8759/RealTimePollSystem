/**
* Three controllers defined in this file, 
* The first one is "PollListController", for listing all the polls stored in the DB
* The second one is "CreateNewPollController", for creating a new poll, and save it into DB
* The third one is "PollDetailsController", for checking the detail info of certain poll
*/

"use strict";

var pollControllers = angular.module('pollControllers', ['ngAnimate']);

// the controller for listing all polls in the database
pollControllers.controller('PollListController', ['$scope', 'Poll', 'filterFilter', 
  function($scope, Poll, filterFilter) {
    $scope.polls = Poll.query();

    $scope.itemsPerPage = 6;
    $scope.currentPage = 1;

    $scope.polls.$promise.then(function () {
      $scope.totalItems = $scope.polls.length;
      $scope.maxSize = 5;
      $scope.$watch('query', function (newQuery, oldQuery) {
        $scope.currentPage = 1;
        //$scope.filteredPolls = $filter('filter')($scope.polls, $scope.query);
        $scope.filteredPolls = filterFilter($scope.polls, {question: $scope.query});
        $scope.noOfPages = $scope.filteredPolls.length / $scope.itemsPerPage;
        if(newQuery !== oldQuery) {
            $scope.totalItems = $scope.filteredPolls.length;
        }
    });
  });
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
    // define a method, for adding more choice into choices[]
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
        // create a obj to be saved
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

// the controller for listing the detail info of certain poll
pollControllers.controller('PollDetailsController', ['$scope', '$routeParams', 'Poll', 'Socket',
  function($scope, $routeParams, Poll, Socket) {
    $scope.poll = Poll.get({ pollId: $routeParams.pollId });

    Socket.on('myVote', function(data) {
      console.dir(data);
      if(data._id === $routeParams.pollId) {
        $scope.poll = data;
      }
    });

    Socket.on('vote', function(data) {
      console.dir(data);
      if(data._id === $routeParams.pollId) {
        $scope.poll.choices = data.choices;
        $scope.poll.total = data.total;
      }
    });

    $scope.vote = function() {
      var pollId = $scope.poll._id;
      var userVote = $scope.poll.userVote;

      if(userVote) {
        var voteObj = {
          poll_id: pollId,
          choice: userVote
        };
        Socket.emit('send:vote', voteObj);
      } else {
        alert('You must to do meaningful vote!');
      }

    };
}]);
