// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','ui.router','ngCordova','app.controllers','app.services'])

.run(function($ionicPlatform,$cordovaSplashscreen) {
  $ionicPlatform.ready(function() {

    $cordovaSplashscreen.show();
    setTimeout(function() {
      $cordovaSplashscreen.hide()
    }, 1000);
    /*

    */
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

/*
    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'templates/main.html'
    })

    $stateProvider.state('app.todos', {
      abstract: true,
      url: '/todos',
      views: {
        todos: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })

    $stateProvider.state('app.todos.index', {
      url: '',
      templateUrl: 'templates/todos.html',
      controller: 'TodosCtrl'
    })


    $stateProvider.state('app.todos.detail', {
      url: '/:todo',
      templateUrl: 'templates/todo.html',
      controller: 'TodoCtrl',
      resolve: {
        todo: function($stateParams, TodosService) {
          return TodosService.getTodo($stateParams.todo)
        }
      }
    })
    */
    $urlRouterProvider.otherwise('/login')

    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'templates/main.html'
    })

    $stateProvider.state('app.login', {
      abstract: true,
      url: '/login',
      views: {
        login: {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })

    $stateProvider.state('app.login.index', {
      url: '',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    $stateProvider.state('app.help', {
      url: '/help',
      views: {
        help: {
          templateUrl: 'templates/help.html'
        }
      }
    })

    $stateProvider.state('app.list', {
      url: '/list',
      views: {
        list: {
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'        }
      }
    })

  });


