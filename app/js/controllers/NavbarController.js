'use strict';

/*Route path (matched against $location.path*/
/*$route.current*/
foodMeApp.controller('NavbarController', function NavbarController($scope, $location) {

  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

});
