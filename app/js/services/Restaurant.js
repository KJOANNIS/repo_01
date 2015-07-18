'use strict';

/*https://docs.angularjs.org/api/ngResource/service/$resource*/

//used for sharing functions and objects across application
foodMeApp.factory('Restaurant', function($resource) {
    /*get the restaurant based on the id*/
  return $resource('/api/restaurant/:id', {id: '@id'});
});