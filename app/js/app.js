'use strict';


/*foodMeApp is the module refer that we will refer in HTML*/

/*ngRoute will provide services like $routeProvider , $routeParams*/
/*https://docs.angularjs.org/api/ngRoute*/

/*ngResource provides services like $service*/
/*https://docs.angularjs.org/api/ngResource*/

/*http://www.bennadel.com/blog/2715-services-and-factories-are-instantiated-on-demand-in-angularjs.htm*/

var foodMeApp = angular.module('foodMeApp', ['ngRoute','ngResource']);

/*https://docs.angularjs.org/api/ngRoute/provider/$routeProvider*/
foodMeApp.config(function($routeProvider) {
  $routeProvider.
      when('/', {                                  /*Default Page*/
        controller: 'RestaurantsController',
        templateUrl: 'views/restaurants.html'
      }).
      when('/menu/:restaurantId', {                 /*when we select and particular restaurant*/
        controller: 'MenuController',
        templateUrl: 'views/menu.html'
      }).
      when('/checkout', {                           /*when we checkout from cart*/
        controller: 'CheckoutController',
        templateUrl: 'views/checkout.html'
      }).
      when('/thank-you', {                           /*Thanking Note after successful order */
        controller: 'ThankYouController',
        templateUrl: 'views/thank-you.html'
      }).
      when('/customer', {                           /*Login Page*/
        controller: 'CustomerController',
        templateUrl: 'views/customer.html'
      }).
      when('/who-we-are', {                         /*static navigation pages*/
        templateUrl: 'views/who-we-are.html'
      }).
      when('/how-it-works', {                       /*static navigation pages*/
        templateUrl: 'views/how-it-works.html'
      }).
      when('/help', {                               /*static navigation pages*/
        templateUrl: 'views/help.html'
      }).
      otherwise({                                   /*handle any other url just like error handling and will redirect*/
          redirectTo: "/"
      });
});
