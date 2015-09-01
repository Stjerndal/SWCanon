angular.module('starter.controllers')

.controller('CanonController', function($scope, $http, $state, $ionicHistory) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.characters = data.characters;
      $scope.whatmedia=$state.params.mId;
      $scope.data = {};
    });
  	$scope.today = new Date();
    $scope.yesterday = new Date();
    $scope.yesterday.setDate($scope.today.getDate() - 1);

    $scope.$on('$ionicView.enter', function(){
      var curState = $ionicHistory.currentStateName();
      if(curState === 'tab.mediaDetail') {
        $scope.routeFix = '/canon'
      } else {
        $scope.routeFix = null;
      }
    });

});