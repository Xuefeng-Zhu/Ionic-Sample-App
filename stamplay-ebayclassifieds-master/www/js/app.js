// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.templatesComponent', 'ngCordova'])
.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.styleColor('white');
      //StatusBar.styleDefault();
    }
  });
})
.constant('APPID', '')
.constant('APIKEY','')
.constant('BASEURL', '') // e.g. http://APPID.stamplay.com
.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      resolve: {
        category: function (Category) {
          return Category.getPromise();
        },
        areas : function(Area){
          return Area.getPromise();
        },
        items : function(Item){
          return Item.getPromise();
        }
      },
    })

    // Each tab has its own nav history stack:

    .state('tab.item', {
      url: '/item',
      views: {
        'tab-item': {
          templateUrl: 'templates/tab-item.html',
          controller: 'FindCtrl'
        }
      },
    })

    .state('tab.item-view', {
      url: '/item/:itemId',
      views: {
        'tab-item': {
          templateUrl: 'templates/item-view.html',
          controller: 'ItemCtrl'
        }
      }
    })
    .state('tab.publish', {
      url: '/publish',
      views: {
        'tab-publish': {
          templateUrl: 'templates/tab-publish.html',
          controller: 'PublishCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('tab.login', {
      url: '/settings/login',
      views: {
        'tab-settings': {
          templateUrl: 'templates/login-view.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tab.signup', {
      url: '/settings/signup',
      views: {
        'tab-settings': {
          templateUrl: 'templates/signup-view.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tab.contact', {
      url: '/settings/contact',
      views: {
        'tab-settings': {
          templateUrl: 'templates/contact-view.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('tab.terms', {
      url: '/settings/terms',
      views: {
        'tab-settings': {
          templateUrl: 'templates/terms-view.html',
          controller: 'SettingsCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/item');
});

