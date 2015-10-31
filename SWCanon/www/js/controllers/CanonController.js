angular.module('starter.controllers')

.controller('CanonController', function($scope, $http, $state, $ionicHistory, $localstorage, $ionicDeploy, ionicToast, $ionicPlatform, $ionicAnalytics) {
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

    $ionicAnalytics.track('typeFiltersOnLoad', { typeFilters: $scope.typeFilters });
    $ionicAnalytics.track('sortByOnLoad', { sortBy: $scope.sortBy });

    //If locally saved typeFilters not found/or everything is hidden:
    if(!$scope.typeFilters || (!$scope.typeFilters.Movie && !$scope.typeFilters.TV && !$scope.typeFilters.Book && !$scope.typeFilters.Comic)) {
      // console.log("empty")
      $scope.typeFilters.Movie = true;
      $scope.typeFilters.TV = true;
      $scope.typeFilters.Book = true;
      $scope.typeFilters.Comic = false;
      $localstorage.setObject('typeFilters', {
        Movie: $scope.typeFilters.Movie,
        TV: $scope.typeFilters.TV,
        Book: $scope.typeFilters.Book,
        Comic: $scope.typeFilters.Comic
      });
    }
    if(!$scope.sortBy) {
      $localstorage.set('sortBy', 'canon_date_sort');
      $localstorage.set('sortByDisplay', 'Chronological order');
    }

    $scope.$on('$ionicView.enter', function(){
      $scope.sortBy = $localstorage.get('sortBy');
      $scope.typeFilters = $localstorage.getObject('typeFilters');

      $ionicAnalytics.track('typeFiltersOnEnter', { typeFilters: $scope.typeFilters });
    $ionicAnalytics.track('sortByOnEnter', { sortBy: $scope.sortBy });

      var curState = $ionicHistory.currentStateName();
      if(curState === 'tab.mediaDetail') {
        $scope.routeFix = '/canon'
      } else {
        $scope.routeFix = null;
      }
    });

    function showToast(msg){
      // ionicToast.show(message, position, stick, time);
      //ionicToast.show('This is a toast at the top.', 'top', true, 2500);
      ionicToast.show(msg, 'middle', false, 2500);
    };


    // Check Ionic Deploy for new code
    $scope.checkForUpdates = function() {
      //PUBLISH COMPILE
      // $ionicDeploy.setChannel("dev");
      //iOS:
      //$ionicDeploy.setChannel("prodios");
      //Android:
      $ionicDeploy.setChannel("prodandroid");
      
      // console.log('Ionic Deploy: Checking for updates');
      $ionicDeploy.check().then(function(hasUpdate) {
        // console.log('Ionic Deploy: Update available: ' + hasUpdate);
        // showToast('Update available: ' + hasUpdate);
          $scope.$parent.updates.hasUpdate = hasUpdate;
          if($scope.$parent.updates.hasUpdate) {
            $scope.$parent.updates.num = 1;
          };
      }, function(err) {
        // console.error('Ionic Deploy: Unable to check for updates', err);
        // showToast('Unable to check for updates' + err);
        // var hasUpdate = true;
        // $scope.$parent.updates.hasUpdate = hasUpdate;
        //   if($scope.$parent.updates.hasUpdate) {
        //     $scope.$parent.updates.num = 1;
        //   };
        //   console.log('canonhasupdate: ' + $scope.$parent.updates.hasUpdate)
      });
     
    }

    $ionicPlatform.ready(function() {
      var curState = $ionicHistory.currentStateName();
      if(curState === 'tab.canon') {
        $scope.checkForUpdates();
      }
    });

    // $scope.$on('$ionicView.loaded', function(){
       // $scope.checkForUpdates();
    // });

});