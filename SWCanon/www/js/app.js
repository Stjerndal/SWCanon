// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core','ionic.service.deploy', 'starter.controllers', 'starter.directives', 'starter.filters', 'ionic-toast'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // "wait for deviceready" before configuring nativetransitions
    // Native transition configuration, override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 500;
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
  });
  
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Disable normal css transitions, in favor of native ones
  // (using telerik plugin and goNative directive.)
  $ionicConfigProvider.views.transition('none');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })
    .state('tab.detail', {
      url: '/list/:mId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

  .state('tab.settings', {
      url: '/settings',
      views: {
        'settings-tab' : {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/list');

  $ionicConfigProvider.tabs.position('bottom'); // other values: top

  $ionicConfigProvider.scrolling.jsScrolling(false);

});

