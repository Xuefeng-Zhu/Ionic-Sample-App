
angular.module('starter.services', [])
.factory('Promise',function($http, APPID, APIKEY, BASEURL){
  return {
    resolve : function(data){
      data.url = BASEURL + data.url 
      if(!data.headers)
        data.headers = {}
      data.headers.Authorization = 'Basic '+ btoa(APPID+":"+APIKEY);
      var call = $http(data)
      return call;
    }
  }
})
.factory('User', function(Promise){
  var user = {}
  return {
    login: function(data){
      return Promise.resolve({ method: 'POST', data: data,url:  '/auth/v0/local/login'})
    },
    signup: function(data){
      return Promise.resolve({ method: 'POST', data: data, url: '/api/user/v0/users'})
    },
  }
})
.factory('Category', function($q, Promise) {
  var categories = [];
  var getPromise = function () {
      var def = $q.defer();
      if (categories.length > 0) {
        def.resolve();
      } else {
        Promise.resolve({ method: 'GET', url: '/api/cobject/v0/category'})
        .then(function(response){
          categories = response.data.data;
          def.resolve();
        },function(){})
      }
      return def.promise;
    }

  return {
    getPromise: getPromise,
    all: function() {
      return categories;
    },
     get: function(categoryName) {
      // Simple index lookup
       for(var i= 0; i<categories.length; i++){
        if(categories[i].name == categoryName)
        return categories[i];
      }
    },
    getFromId: function(id) {
      // Simple index lookup
      for(var i= 0; i<categories.length; i++){
        if(categories[i]._id == id)
        return categories[i];
      }
    }
  }
})
.factory('Area', function($q, Promise) {

  var areas = [];
  var getPromise = function () {
      var def = $q.defer();
      if (areas.length > 0) {
        def.resolve();
      } else {
         Promise.resolve({ method: 'GET', url: '/api/cobject/v0/area'})
        .then(function(response){
          areas = response.data.data;
          def.resolve();
        },function(){})
      }
      return def.promise;
    }

  return {
    getPromise: getPromise,
    all: function() {
      return areas;
    },
    get: function(areaName) {
      // Simple index lookup
      for(var i= 0; i<areas.length; i++){
        if(areas[i].name == areaName)
        return areas[i];
      }
    },
    getFromId: function(id) {
      // Simple index lookup
      for(var i= 0; i<areas.length; i++){
        if(areas[i]._id == id)
        return areas[i];
      }
    }
  }
})
.factory('Item', function(){ 
  var items = [];
  var getPromise = function () {
      var def = $q.defer();
      if (items.length > 0) {
        def.resolve();
      } else {
         Promise.resolve({ method: 'GET', url: '/api/cobject/v0/item'})
        .then(function(response){
          items = response.data.data;
          def.resolve();
        },function(){})
      }
      return def.promise;
    }
    
    return {
    getPromise: getPromise,
    get: function(itemId) {
      // Simple index lookup
      for(var i= 0; i<items.length; i++){
        if(items[i]._id == itemId)
        return items[i];
      }
    },
    set: function(data){
      items = data;
    },
    all: function(){
      return items
    }
  }
})
.factory('YourItems', function(){
  
  var yourItems = [];
  var load = false;

  return {
    set: function(data){
      yourItems = data;
      load = true;
    },
    all: function(){
      return yourItems
    },
    isLoad: function(){
      return load;
    }
  }
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove : function(key){
      $window.localStorage.removeItem(key);
    }
  }
}])
//FACTORIES FOR AVOID TOO MANY INJECTION ON SIGNATURE OF CONTROLLERS
.factory('ItemConfig',function(Area, Category, Item){
  return {
    Area : Area,
    Category: Category,
    Item: Item
  }
})
.factory('IonicComponent',function($ionicModal, $ionicScrollDelegate, $ionicLoading, $ionicPopup){
  return {
    Modal: $ionicModal, 
    ScrollDelegate: $ionicScrollDelegate, 
    Loading: $ionicLoading, 
    Popup: $ionicPopup
  }
})
.factory('Utils',  function($state, $stateParams, $localstorage){
  return {
    State: $state,
    Params: $stateParams,
    LocalStorage: $localstorage,
    dataURItoBlob: function(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++){
        ia[i] = byteString.charCodeAt(i);
      }
      var bb = new Blob([ab], { "type": mimeString });
      return bb;
    },
    validateAll: function(form , file){
      if(Object.keys(form).length == 8 && file){
        return true
      }else
        return false;
    }
  };
})
