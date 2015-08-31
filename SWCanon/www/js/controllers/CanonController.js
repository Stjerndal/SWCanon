angular.module('starter.controllers')

.controller('CanonController', function($scope, $http, $state) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.characters = data.characters;
      $scope.whatmedia=$state.params.mId;
      $scope.data = {};
    });
  	$scope.today = new Date();
    $scope.yesterday = new Date();
    $scope.yesterday.setDate($scope.today.getDate() - 1);
});