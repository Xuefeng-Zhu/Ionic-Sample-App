angular.module('ionic.weather', ['ionic', 'ionic.weather.services', 'ionic.weather.filters', 'ionic.weather.directives'])

.constant('WUNDERGROUND_API_KEY', '1cc2d3de40fa5af0')

.constant('FORECASTIO_KEY', '4cd3c5673825a361eb5ce108103ee84a')

.constant('FLICKR_API_KEY', '504fd7414f6275eb5b657ddbfba80a2c')

.filter('int', function() {
  return function(v) {
    return parseInt(v) || '';
  };
})

.controller('WeatherCtrl', function($scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform) {
  var _this = this;

  $ionicPlatform.ready(function() {
    // Hide the status bar
    if(window.StatusBar) {
      StatusBar.hide();
    }
  });

  $scope.activeBgImageIndex = 0;

  $scope.showSettings = function() {
    if(!$scope.settingsModal) {
     // Load the modal from the given template URL
      $ionicModal.fromTemplateUrl('settings.html', function(modal) {
        $scope.settingsModal = modal;
        $scope.settingsModal.show();
      }, {
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
    } else {
      $scope.settingsModal.show();
    }
  };


  this.getBackgroundImage = function(lat, lng, locString) {
    Flickr.search(locString, lat, lng).then(function(resp) {
      var photos = resp.photos;
      if(photos.photo.length) {
        $scope.bgImages = photos.photo;
        _this.cycleBgImages();
      }
    }, function(error) {
      console.error('Unable to get Flickr images', error);
    });
  };

  this.getCurrent = function(lat, lng, locString) {
    Weather.getAtLocation(lat, lng).then(function(resp) {
      /*
      if(resp.response && resp.response.error) {
        alert('This Wunderground API Key has exceeded the free limit. Please use your own Wunderground key');
        return;
      }
      */
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);
      $rootScope.$broadcast('scroll.refreshComplete');
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
  };

  this.cycleBgImages = function() {
    $timeout(function cycle() {
      if($scope.bgImages) {
        $scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length];
      }
      //$timeout(cycle, 10000);
    });
  };

  $scope.refreshData = function() {
    Geo.getLocation().then(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      Geo.reverseGeocode(lat, lng).then(function(locString) {
        $scope.currentLocationString = locString;
        _this.getBackgroundImage(lat, lng, locString);
      });
      _this.getCurrent(lat, lng);
    }, function(error) {
      alert('Unable to get current location: ' + error);
    });
  };

  $scope.refreshData();
})

.controller('SettingsCtrl', function($scope, Settings) {
  $scope.settings = Settings.getSettings();

  // Watch deeply for settings changes, and save them
  // if necessary
  $scope.$watch('settings', function(v) {
    Settings.save();
  }, true);

  $scope.closeSettings = function() {
    $scope.modal.hide();
  };

});
