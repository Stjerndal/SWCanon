angular.module('starter.controllers')

.controller('CanonController', function($scope, $http, $state, $ionicHistory, $localstorage) {
    $http.get('js/data/data.json').success(function(data) {
      $scope.media = data.media;
      $scope.characters = data.characters;
      $scope.whatmedia=$state.params.mId;
      $scope.data = {};
    });

    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

  	$scope.today = [year, month, day].join('-');


    // $scope.yesterday = new Date();
    // $scope.yesterday.setDate($scope.today.getDate() - 1);
    $scope.typeFilters = $localstorage.getObject('typeFilters');
    $scope.sortBy = $localstorage.get('sortBy');

    //If locally saved typeFilters not found/or everything is hidden:
    if(!$scope.typeFilters || (!$scope.typeFilters.Movie && !$scope.typeFilters.TV && !$scope.typeFilters.Book && !$scope.typeFilters.Comic)) {
      console.log("empty")
      $scope.typeFilters.Movie = true;
      $scope.typeFilters.Book = true;
      $localstorage.setObject('typeFilters', {
        Movie: $scope.typeFilters.Movie,
        TV: $scope.typeFilters.TV,
        Book: $scope.typeFilters.Book,
        Comic: $scope.typeFilters.Comic
      });
    }
    if(!$scope.sortBy) {
      $localstorage.set('sortBy', 'canon_date_begin');
      $localstorage.set('sortByDisplay', 'Chronological order');
    }

    $scope.$on('$ionicView.enter', function(){
      $scope.sortBy = $localstorage.get('sortBy');
      $scope.typeFilters = $localstorage.getObject('typeFilters');

      var curState = $ionicHistory.currentStateName();
      if(curState === 'tab.mediaDetail') {
        $scope.routeFix = '/canon'
      } else {
        $scope.routeFix = null;
      }
    });



});