'use strict';

/*https://docs.angularjs.org/api/ngResource/service/$resource*/

//used for sharing functions and objects across application

//if id is selected then menu of particular restaurant send back and redirected to menu page
//if no id then all the restaurants are response back
foodMeApp.factory('Restaurant', function($resource) {
    /*get the restaurant based on the id*/
  return $resource('/api/restaurant/:id', {id: '@id'});
});