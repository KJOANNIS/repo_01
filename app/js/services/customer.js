'use strict';

/*https://docs.angularjs.org/api/ng/type/$rootScope.Scope*/
/*Other components (like services) only have access to the $rootScope service.*/

//used for sharing functions and objects across application
/*http://stackoverflow.com/questions/15666048/service-vs-provider-vs-factory*/
foodMeApp.factory('customer', function($rootScope, localStorage) {
  var LOCAL_STORAGE_ID = 'fmCustomer',
      customerString = localStorage[LOCAL_STORAGE_ID];

  var customer = customerString ? JSON.parse(customerString) : {
    name: undefined,
    address: undefined
  };

   /*$watch(watchExpression, listener, [objectEquality]);

    The watchExpression is called on every call to $digest()
    Since $digest() reruns when it detects changes in the watchExpression

    The listener is called only when the value from the current
    watchExpression and the previous call to watchExpression are not equal

    When objectEquality == true, inequality of the watchExpression is determined according to the angular.equals function.
    To save the value of the object for later comparison, the angular.copy function is used.
    This therefore means that watching complex objects will have adverse memory and performance implications.
    */

  $rootScope.$watch(function() {return customer;},
                    function() {localStorage[LOCAL_STORAGE_ID] = JSON.stringify(customer);},
                    true);
  return customer;
});