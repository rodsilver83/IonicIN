// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ngAnimate', 'ionic', 'ui.router', 'ngCordova', 'app.controllers', 'app.services', 'app.directives'])

    .run(function ($ionicPlatform, $templateCache, $cordovaSplashscreen) {
      $ionicPlatform.ready(function () {
        $cordovaSplashscreen.show();
        setTimeout(function () {
          $cordovaSplashscreen.hide()
        }, 1000);
        /*

         */
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        // Lastly, we pre-load templates so page transitions are sexy-smooth
        var templates = [
          "login",
          "main",
          "detail",
          "list",
          "topsubmenu",
          "loginmodal"
        ];
        templates.forEach(function (tpl) {
          $http.get('templates/' + tpl + '.html', { cache: $templateCache });
        });


      });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      // Listen to all successful requests, so we can cache some queries
      $httpProvider.interceptors.push('cacheInterceptor');

      $stateProvider
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/main.html"
        })
        .state('app.login', {
          url: '/login',
          views: {
            login: {
              templateUrl: 'templates/login.html',
              controller: 'LoginCtrl'
            }
          }
        })

        .state('app.list', {
          url: '/list',
          views: {
            list: {
              templateUrl: 'templates/list.html',
              controller: 'ListCtrl'
            }
          }
        })

        .state('app.detail', {
          url: '/detail/:noticia',
          views: {
            detail: {
              templateUrl: 'templates/detail.html',
              controller: 'DetailCtrl'
            }
          },
          resolve: {
            noticia: function ($stateParams, NewsService) {
              return NewsService.setNoticia($stateParams.noticia);
            }
          }
        })

      $urlRouterProvider.otherwise('/app/login')


    })
    // a basic HTTP interceptor that passes each successful response through the 'response' method
    .factory('cacheInterceptor', function ($q, RequestCache) {
      // keep this light, it runs before any request is returned, avoid async here
      return {
        // catch successful requests and send them to the RequestCache service
        'response': function (response) {
          RequestCache.entry(response);
          return response || $q.when(response);
        }
      }
    })
  ;


