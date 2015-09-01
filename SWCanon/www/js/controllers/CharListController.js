angular.module('starter.controllers')

.controller('CharListController', function($scope, $http, $state, $ionicHistory) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.characters = data.characters;
      $scope.whichchar=$state.params.cId;
      $scope.data = {};
    });

    
    $scope.$on('$ionicView.enter', function(){
      var curState = $ionicHistory.currentStateName();
      if(curState === 'tab.charDetail') {
        $scope.routeFix = '/charList'
      } else {
        $scope.routeFix = null;
      }
    });

});