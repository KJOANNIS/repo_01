'use strict';

/*https://docs.angularjs.org/api/ngRoute/service/$routeParams*/
foodMeApp.controller('ThankYouController', function ThankYouController($scope, $routeParams) {
  $scope.orderId = $routeParams.orderId;
});
