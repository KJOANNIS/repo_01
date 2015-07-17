'use strict';

/*https://docs.angularjs.org/api/ng/type/$rootScope.Scope*/
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
    */
  $rootScope.$watch(function() {return customer;},
                    function() {localStorage[LOCAL_STORAGE_ID] = JSON.stringify(customer);},
                    true);
  return customer;
});