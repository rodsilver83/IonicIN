angular.module('app.controllers', [])

  .controller('LoginCtrl', ['$scope', '$state','$http','NewsService', function ($scope, $state, $http,NewsService) {
    $scope.$root.tabsHidden = "tabs-hide";

    $scope.username = 'appuser@tapp.mx';
    $scope.password = 'password';
    $scope.msg = '';
    $scope.user = '';
    $scope.remember = false;

    NewsService.loadNews().success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      NewsService.news = data.data;
    })
    $state.go('app.login.index');
    //$state.go($state.current, {}, {reload: true});

    $scope.doLogin = function(){
      NewsService.doLogin($scope.username,$scope.password).success(function(data, status, headers, config){
          if(data.success === 0){
            $scope.msg = data.msg;
          }else{
            $scope.user = data.data;
            NewsService.user = data.data;
            $state.go('app.list');
          }
      });
    }
  }])

  .controller('ListCtrl',['$scope','$http','$state','NewsService',function($scope, $http, $state,NewsService){
    $scope.user = NewsService.user;
    $scope.noticias = NewsService.news;
  }]);