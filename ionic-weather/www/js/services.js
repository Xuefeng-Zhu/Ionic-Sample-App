/**
 * Wunderground's API pricing is silly, so it's removed for now.

var wundergroundWeather = ['$q', '$resource', 'WUNDERGROUND_API_KEY', function($q, $resource, WUNDERGROUND_API_KEY) {
  var baseUrl = 'http://api.wunderground.com/api/' + WUNDERGROUND_API_KEY;

  var locationResource = $resource(baseUrl + '/geolookup/conditions/q/:coords.json', {
    callback: 'JSON_CALLBACK'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  var forecastResource = $resource(baseUrl + '/forecast/q/:coords.json', {
    callback: 'JSON_CALLBACK'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  var hourlyResource = $resource(baseUrl + '/hourly/q/:coords.json', {
    callback: 'JSON_CALLBACK'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    getForecast: function(lat, lng) {
      var q = $q.defer();

      forecastResource.get({
        coords: lat + ',' + lng
      }, function(resp) {
        q.resolve(resp);
      }, function(httpResponse) {
        q.reject(httpResponse);
      });

      return q.promise;
    },

    getHourly: function(lat, lng) {
      var q = $q.defer();

      hourlyResource.get({
        coords: lat + ',' + lng
      }, function(resp) {
        q.resolve(resp);
      }, function(httpResponse) {
        q.reject(httpResponse);
      });

      return q.promise;
    },

    getAtLocation: function(lat, lng) {
      var q = $q.defer();

      locationResource.get({
        coords: lat + ',' + lng
      }, function(resp) {
        q.resolve(resp);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    }
  }
}];
*/

var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY', function($q, $resource, $http, FORECASTIO_KEY) {
  var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

  var weatherResource = $resource(url, {
    callback: 'JSON_CALLBACK',
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    getAtLocation: function(lat, lng) {
      return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
    },
    getForecast: function(locationString) {
    },
    getHourly: function(locationString) {
    }
  }
}];


angular.module('ionic.weather.services', ['ngResource'])

.constant('DEFAULT_SETTINGS', {
  'tempUnits': 'f'
})

.factory('Settings', function($rootScope, DEFAULT_SETTINGS) {
  var _settings = {};
  try {
    _settings = JSON.parse(window.localStorage['settings']);
  } catch(e) {
  }

  // Just in case we have new settings that need to be saved
  _settings = angular.extend({}, DEFAULT_SETTINGS, _settings);

  if(!_settings) {
    window.localStorage['settings'] = JSON.stringify(_settings);
  }

  var obj = {
    getSettings: function() {
      return _settings;
    },
    // Save the settings to localStorage
    save: function() {
      window.localStorage['settings'] = JSON.stringify(_settings);
      $rootScope.$broadcast('settings.changed', _settings);
    },
    // Get a settings val
    get: function(k) {
      return _settings[k];
    },
    // Set a settings val
    set: function(k, v) {
      _settings[k] = v;
      this.save();
    },

    getTempUnits: function() {
      return _settings['tempUnits'];
    }
  }

  // Save the settings to be safe
  obj.save();
  return obj;
})

.factory('Geo', function($q) {
  return {
    reverseGeocode: function(lat, lng) {
      var q = $q.defer();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'latLng': new google.maps.LatLng(lat, lng)
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('Reverse', results);
          if(results.length > 1) {
            var r = results[1];
            var a, types;
            var parts = [];
            var foundLocality = false;
            var foundState = false;
            for(var i = 0; i < r.address_components.length; i++) {
              a = r.address_components[i];
              types = a.types;
              for(var j = 0; j < types.length; j++) {
                if(!foundLocality && types[j] == 'locality') {
                  foundLocality = true;
                  parts.push(a.long_name);
                } else if(!foundState && types[j] == 'administrative_area_level_1') {
                  foundState = true;
                  parts.push(a.short_name);
                }
              }
            }
            console.log('Reverse', parts);
            q.resolve(parts.join(', '));
          }
        } else {
          console.log('reverse fail', results, status);
          q.reject(results);
        }
      })

      return q.promise;
    },
    getLocation: function() {
      var q = $q.defer();

      navigator.geolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    }
  };
})

.factory('Flickr', function($q, $resource, FLICKR_API_KEY) {
  var baseUrl = 'https://api.flickr.com/services/rest/'


  var flickrSearch = $resource(baseUrl, {
    method: 'flickr.groups.pools.getPhotos',
    group_id: '1463451@N25',
    safe_search: 1,
    jsoncallback: 'JSON_CALLBACK',
    api_key: FLICKR_API_KEY,
    format: 'json'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    search: function(tags, lat, lng) {
      var q = $q.defer();
  
      console.log('Searching flickr for tags', tags);

      flickrSearch.get({
        tags: tags,
        lat: lat,
        lng: lng
      }, function(val) {
        q.resolve(val);
      }, function(httpResponse) {
        q.reject(httpResponse);
      });

      return q.promise;
    }
  };
})

.factory('Weather', forecastioWeather);
