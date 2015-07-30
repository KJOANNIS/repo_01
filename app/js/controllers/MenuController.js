'use strict';

foodMeApp.controller('MenuController',
    function MenuController($scope, $routeParams, Restaurant, cart) {

        /*https://docs.angularjs.org/api/ngResource/service/$resource  check credit card example*/
  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
  $scope.cart = cart;

});
