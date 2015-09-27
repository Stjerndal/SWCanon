angular.module('starter.controllers')



.controller('SettingsController', function($scope, $ionicDeploy, ionicToast, $ionicHistory, $localstorage, $ionicPopup, $ionicAnalytics) {

	$scope.$on('$ionicView.enter', function(){
		console.log('hasupdate: ' + $scope.$parent.updates.hasUpdate);
		console.log('badger: ' + $scope.$parent.updates.num);
    	$scope.sortBy = $localstorage.get('sortBy');
    	$scope.sortByDisplay = $localstorage.get('sortByDisplay');
    	$scope.typeFilters = $localstorage.getObject('typeFilters');
    	$scope.hasUpdate = $scope.$parent.updates.hasUpdate;
  	});

	// ionic-toast bower component
	function showToast(msg){
		// ionicToast.show(message, position, stick, time);
		//ionicToast.show('This is a toast at the top.', 'top', true, 2500);
		ionicToast.show(msg, 'middle', false, 2500);
	};

	function showToastTop(msg){
		// ionicToast.show(message, position, stick, time);
		//ionicToast.show('This is a toast at the top.', 'top', true, 2500);
		ionicToast.show(msg, 'top', true, 2500);
	};


	$scope.doUpdate = function() {
		//PUBLISH COMPILE
      	// $ionicDeploy.setChannel("dev");

	    $ionicDeploy.update().then(function(res) {
	      console.log('Ionic Deploy: Update Success! ', res);
	      showToast('Update Success!'); 
	      //$ionicAnalytics.track('updateSuccess', { updateResult: res });
	    }, function(err) {
	      console.log('Ionic Deploy: Update error! ', err);
	      showToast('Update error: ' + err);
	      $ionicAnalytics.track('updateError', { errorMsg: err });
	    }, function(prog) {
	      console.log('Ionic Deploy: Progress... ', prog);
	      showToast('Update in progress... ' + prog + '%', prog);
	    });
	};

	// Check Ionic Deploy for new code
	$scope.checkForUpdates = function() {
		//PUBLISH COMPILE
      	//$ionicDeploy.setChannel("dev");

		console.log('Ionic Deploy: Checking for updates');
	    $ionicDeploy.check().then(function(hasUpdate) {
	    	console.log('Ionic Deploy: Update available: ' + hasUpdate);
	    	if(hasUpdate) {
	    		showToast('New content available!');
	    	} else {
	    		showToast('No new updates.');
	    	}
	    	$ionicAnalytics.track('updateCheck', { result: hasUpdate });
	    	$scope.hasUpdate = hasUpdate;
	    	$scope.$parent.updates.hasUpdate = hasUpdate;
	    	if($scope.hasUpdate) {
	    		$scope.$parent.updates.num = 1;
	    	};
	    }, function(err) {
	    	console.error('Ionic Deploy: Unable to check for updates: ', err);
	    	showToast('Unable to check for updates: ' + err);
	    	$ionicAnalytics.track('updateCheck', { result: err });
	    	// var hasUpdate = true;
	    	// $scope.hasUpdate = hasUpdate;
	    	// $scope.$parent.updates.hasUpdate = hasUpdate;
	    	// if($scope.hasUpdate) {
	    	// 	$scope.$parent.updates.num = 1;
	    	// };
	    });

	    console.log('Title inc...');
	    console.log('View title: ' + $ionicHistory.currentTitle());
	}


	// Triggered on a button click, or some other target
	$scope.showPopup = function() {
		//$scope.data = {}

		// An elaborate, custom popup
	    sortPopup = $ionicPopup.show({
		    templateUrl: 'templates/sortPopup.html',
		    title: 'Sort media by',
		    scope: $scope
    	});

	    $scope.closePopup = function (sortChoice, display) {
	    	$localstorage.set('sortBy', sortChoice);
	    	$scope.sortBy = sortChoice;
	    	$localstorage.set('sortByDisplay', display);
	    	$scope.sortByDisplay = display;
			sortPopup.close();
			$ionicAnalytics.track('sortBySelect', { sortBy: sortChoice });
			// var launchCount = $localstorage.get('launchCount');
			// showToast('launchCount: ' + launchCount);
		};


		sortPopup.then(function(res) {
			console.log('Chose: ' + $localstorage.get('sortBy'));
		});
	};

	$scope.closePopup = function () {
		sortPopup.close();
	};

	$scope.makeToggle = function() {
		console.log('toggling...' + $scope.typeFilters.Movie);
		console.log('toggling...' + $scope.typeFilters.TV);
		console.log('toggling...' + $scope.typeFilters.Book);
		console.log('toggling...' + $scope.typeFilters.Comic);

		$localstorage.setObject('typeFilters', {
    		Movie: $scope.typeFilters.Movie,
    		TV: $scope.typeFilters.TV,
    		Book: $scope.typeFilters.Book,
    		Comic: $scope.typeFilters.Comic
  		});
	}


});