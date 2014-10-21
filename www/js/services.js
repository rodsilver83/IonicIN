angular.module('app.services', [])
  .service('NewsService', ['$rootScope', '$timeout', '$http', function ($rootScope, $timeout, $http) {
    var news = {};
    var user = {};
    var index = 0;

    return {
      loadNews: function () {
        return $http.get('http://webadmin.tapp.q-ark.mx/api/internews/noticias');
      },
      doLogin: function (username, password) {
        return $http({
          url: 'http://webadmin.tapp.q-ark.mx/api/auth/login/identity/' +
            encodeURIComponent(username) +
            '/password/' +
            encodeURIComponent(password),
          method: "GET"
        });
      },
      user: this.user,
      news: this.news,
      getNoticia: function () {
        return this.news[this.index]
      },
      setNoticia: function (index) {
        this.index = index;
        return this.news[index]
      }
    }
  }])
  .factory('Internews', function ($rootScope, $http, $q) {
    // define the API in just one place so it's easy to update
    var apiURL = 'http://webadmin.tapp.q-ark.mx/api/';

    function validateResponse(result) {
      return !(typeof result.data != 'array' && typeof result.data != 'object');
    }

    // Each return method is nearly identical, but it's good to keep them separate so they can be easily customized.
    // They start by initiating and returning a promise, allowing for the then() method controller's use.
    // They also start their respective AJAX request to the API server.
    // We validate the response to make sure it's valid data and then we resolve the promise, passing the data to
    // the controller's then() method
    return {
      // get all recent posts
      list: function (page) {
        var q = $q.defer();
        $http.get(apiURL + 'internews/noticias/' + page)
          .then(function (result) {
            return !validateResponse(result) ? q.reject(new Error('Invalid Response')) : q.resolve(result.data);
          }, function (err) {
            console.log('Search Failed');
            q.reject(err);
          });
        return q.promise;
      },
      login: function (page) {
        var q = $q.defer();
        $http.get(apiURL + 'auth/login/identity/' + page)
          .then(function (result) {
            return !validateResponse(result) ? q.reject(new Error('Invalid Response')) : q.resolve(result.data);
          }, function (err) {
            console.log('Search Failed');
            q.reject(err);
          });
        return q.promise;
      }
    }
  })

/**
 * A service that caches some API responses
 */

  .factory('RequestCache', function () {
    // what pages should we cache?
    var requestsToCache = ['frontpage/1', 'new/1'];
    // create the cache if it doesn't exist yet
    var cache = typeof localStorage.cache == 'undefined' ? {} : JSON.parse(localStorage.cache);
    return{
      // enter a request's reponse in to the cache
      entry: function (request) {
        for (var i = 0; i < requestsToCache.length; i++) {
          if (request.config.url.indexOf(requestsToCache[i]) != -1) {
            cache[requestsToCache[i]] = request.data;
            localStorage.cache = JSON.stringify(cache);
          }
        }
      },
      // request a cache item's data based on the requested URL
      get: function (url) {
        return typeof cache[url] === 'undefined' ? false : cache[url];
      }
    }
  })
;