/**
 * Created by Rod on 10/12/14.
 */
angular.module('app.directives', [])

  .directive('topSubmenu', function() {
    return {
      restrict: 'E',
      scope: {
        topsubmenu: '=topsubmenu',
        close: '&onclose'
      },
      templateUrl: 'templates/topsubmenu.html'
    };
  });