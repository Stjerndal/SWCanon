angular.module('starter.controllers')

.controller('CharListController', function($scope, $http, $state) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.people = data.people;
      $scope.characters = data.characters;
      $scope.whichchar=$state.params.cId;
      $scope.data = {};
    });
});