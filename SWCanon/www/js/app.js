// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('starter', ['ionic','ionic.service.core','ionic.service.analytics','ionic.service.deploy', 'starter.controllers', 'starter.directives', 'starter.filters', 'ionic-toast', 'ionic.utils', 'admobModule'])
//Adless:
angular.module('starter', ['ionic','ionic.service.core','ionic.service.analytics','ionic.service.deploy', 'starter.controllers', 'starter.directives', 'starter.filters', 'ionic-toast', 'ionic.utils'])

//Adless:
.run(function($ionicPlatform/*, admobSvc*/, $localstorage, $ionicAnalytics) {
// .run(function($ionicPlatform, admobSvc, $localstorage, $ionicAnalytics) {
  $ionicPlatform.ready(function() {

    $ionicAnalytics.register({

  
      // Don't send any events to the analytics backend.
      // (useful during development)
      dryRun: false
    });
    $ionicAnalytics.setGlobalProperties({
      app_version_number: 'v0.1.0',
      day_of_week: (new Date()).getDay()
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    // if(window.StatusBar) {
    //   StatusBar.styleDefault();
    // }


    // "wait for deviceready" before configuring nativetransitions
    // Native transition configuration, override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 500; //500
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 175; //350
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 225; //350
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 275; //350
    //This same effect can be achieved by passing in a 'slowdownfactor' of more than 1. The higher the number, the less pixels the old page slides out of view:
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 6; //4
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 43; //0
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 49; //0
  });

  var launchCount = parseInt($localstorage.get('launchCount'));

  if(!launchCount) {
    launchCount = 0;
  } else if (launchCount > 3) {
    //Adless remove:
    // admobSvc.createBannerView();
  }
  launchCount += 1;
  $localstorage.set('launchCount', launchCount);
  
})

//Adless:
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider/*, admobSvcProvider*/) {
// .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, admobSvcProvider) {

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
  .state('tab.canon', {
      url: '/canon',
      views: {
        'canon-tab' : {
          templateUrl: 'templates/canon.html',
          controller: 'CanonController'
        }
      }
    })
    .state('tab.mediaDetail', {
      url: '/canon/:mId',
      views: {
        'canon-tab' : {
          templateUrl: 'templates/mediaDetail.html',
          controller: 'CanonController'
        }
      }
    })
    .state('tab.mediaCharDetail', {
      url: '/canon/charList/:cId',
      views: {
        'canon-tab' : {
          templateUrl: 'templates/charDetail.html',
          controller: 'CharListController'
        }
      }
    })

  .state('tab.charList', {
      url: '/charList',
      views: {
        'charList-tab' : {
          templateUrl: 'templates/charList.html',
          controller: 'CharListController'
        }
      }
    })
    .state('tab.charDetail', {
      url: '/charList/:cId',
      views: {
        'charList-tab' : {
          templateUrl: 'templates/charDetail.html',
          controller: 'CharListController'
        }
      }
    })
    .state('tab.charMediaDetail', {
      url: '/charList/canon/:mId',
      views: {
        'charList-tab' : {
          templateUrl: 'templates/mediaDetail.html',
          controller: 'CanonController'
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
  $urlRouterProvider.otherwise('/tab/canon');

  $ionicConfigProvider.tabs.position('bottom'); // other values: top

  $ionicConfigProvider.scrolling.jsScrolling(false);

// Web browser / adless remove:
  // admobSvcProvider.setOptions({
  //   publisherId:          "ca-app-pub-5464445636613782/3723271963",  // Required
  //   interstitialAdId:     "ca-app-pub-5464445636613782/6838188760",  // Optional
  //   bannerAtTop:          true
  // });

  // // Optionally configure the events prefix (by default set to 'admob:')
  // admobSvcProvider.setPrefix('myTag~');

});

