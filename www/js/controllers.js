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

    $scope.userStored = JSON.parse(window.localStorage['user'] || '{}');
    checkLogin();

    function checkLogin(){
      if(!$scope.userStored.remember){
        $state.go('app.login.index');
        $scope.remember = $scope.userStored.remember;
      }
    }

    $scope.doLogin = function(){
      checkLogin();
      NewsService.doLogin($scope.username,$scope.password).success(function(data, status, headers, config){
          if(data.success === 0){
            $scope.msg = data.msg;
          }else{
            $scope.user = data.data;
            $scope.user.remember = $scope.remember;
            NewsService.user = $scope.user;
            $scope.userStored = $scope.user;
            window.localStorage['user'] = JSON.stringify($scope.user);
            $state.go('app.list');
          }
      });
    }
  }])

  .controller('ListCtrl',['$scope','$http','$state','$ionicModal','NewsService',function($scope, $http, $state,$ionicModal, NewsService){

    $scope.topsubmenu = false;
    $scope.user = NewsService.user;
    $scope.noticias = NewsService.news;

    $scope.submenu = function(){
      $scope.topsubmenu = !$scope.topsubmenu;
    }

    $ionicModal.fromTemplateUrl('templates/loginmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    })

    $scope.openModal = function() {
      $scope.modal.show()
    }

    $scope.closeModal = function(session) {
      $scope.modal.hide();
      if(session){
        $scope.user.remember = false;
        window.localStorage['user'] = JSON.stringify($scope.user);
        $state.go('app.login.index');
      }
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.detail = function($index){
      $state.go('app.detail',{index: $index});
    }
    
    $scope.back = function(){
      $scope.openModal();
      //$state.go('app.login.index');
    }
  }])

  .controller('DetailCtrl',['$scope','$http','$state','NewsService',function($scope, $http, $state, NewsService){
    $scope.noticia = NewsService.getNoticia();
    $scope.user = NewsService.user;
    
    $scope.back = function(){
      $state.go('app.list');
    }
  }]);