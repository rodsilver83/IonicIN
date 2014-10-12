angular.module('app.services', [])
  .service('NewsService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {
    var news = {};
    var user = {};

    return {
      loadNews: function(){
        return $http.get('http://webadmin.tapp.q-ark.mx/api/internews/noticias');
      },
      doLogin: function(username,password){
        return $http({
          url: 'http://webadmin.tapp.q-ark.mx/api/auth/login/identity/'+
            encodeURIComponent(username)+
            '/password/'+
            encodeURIComponent(password),
          method: "GET"
        });
      },
      user: user,
      news: news,
      getNews: function (index) {
        return news[index]
      }
    }
  }])