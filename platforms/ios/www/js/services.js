angular.module('app.services', [])
  .service('NewsService', ['$rootScope', '$timeout', '$http', function($rootScope, $timeout, $http) {
    var news = {};
    var user = {};
    var index = 0;

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
      user: this.user,
      news: this.news,
      getNoticia: function () {
        return this.news[this.index]
      },
      setNoticia: function(index){
        this.index = index;
        return this.news[index]
      }
    }
  }])