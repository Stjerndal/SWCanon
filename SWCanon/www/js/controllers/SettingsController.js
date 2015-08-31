angular.module('starter.controllers')



.controller('SettingsController', function($scope, $ionicDeploy, ionicToast) {

	// ionic-toast bower component
	function showToast(msg){
		// ionicToast.show(message, position, stick, time);
		//ionicToast.show('This is a toast at the top.', 'top', true, 2500);
		ionicToast.show(msg, 'middle', false, 2500);
	};

	$scope.doUpdate = function() {
	    $ionicDeploy.update().then(function(res) {
	      console.log('Ionic Deploy: Update Success! ', res);
	      showToast('Update Success! ' + res);
	    }, function(err) {
	      console.log('Ionic Deploy: Update error! ', err);
	      showToast('Update error! ' + err);
	    }, function(prog) {
	      console.log('Ionic Deploy: Progress... ', prog);
	      showToast('Update in progress... ' + prog + '%', prog);
	    });
	};

	// Check Ionic Deploy for new code
	$scope.checkForUpdates = function() {
		console.log('Ionic Deploy: Checking for updates');
	    $ionicDeploy.check().then(function(hasUpdate) {
	    	console.log('Ionic Deploy: Update available: ' + hasUpdate);
	    	showToast('Update available: ' + hasUpdate);
	    	$scope.hasUpdate = hasUpdate;
	    }, function(err) {
	    	console.error('Ionic Deploy: Unable to check for updates', err);
	    	showToast('Unable to check for updates' + err);
	    });
	}
});