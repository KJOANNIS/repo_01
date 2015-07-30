'use strict';

foodMeApp.service('cart', function Cart(localStorage, customer, $rootScope, $http, alert) {
  var self = this;


    /*adding the selected item to cart with args (menuItem, restaurant)*/
  self.add = function(item, restaurant) {
      /*check whether cart is null or not */
      /*if not add to the restaurant id ,name and description to cart */
    if (!self.restaurant || !self.restaurant.id) {
      self.restaurant = {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description
      };
    }

     /*either add the item or if all ready there increment the quantity*/
    if (self.restaurant.id == restaurant.id) {

        /*if cart is not empty search for that particular item*/
      self.items.forEach(function(cartItem) {

        /*search for the particular item in the cart and increment*/
        if (item && cartItem.name == item.name) {

          /*just increment the quantity as item is all ready there*/
          cartItem.qty ++;

          //so that it fails in the next if condition
          item = null;
        }
      });
      /*If item is getting added first time in cart or cart was empty*/
      if (item) {
        /*https://docs.angularjs.org/api/ng/function/angular.copy*/
        item = angular.copy(item);
        item.qty = 1;
        self.items.push(item);
      }
    }

    /*mix menu items from different restaurants.*/
    else {
      alert('Can not mix menu items from different restaurants.');
    }
  };

   /*remove item from cart*/
  self.remove = function(item) {
    var index = self.items.indexOf(item);
    if (index >= 0) {
      self.items.splice(index, 1);
    }
      /*check if items there or not*/
    if (!self.items.length) {
      self.restaurant = {};
    }
  }


    /*Total bill after order*/
  self.total = function() {
    return self.items.reduce(function(sum, item) {
      return sum + Number(item.price * item.qty);
    }, 0);
  };


   /*payment of order*/
  self.submitOrder = function() {
    if (self.items.length) {
      return $http.post('/api/order', {
        items: self.items,
        restaurant: self.restaurant,
        payment: self.payment,
        deliverTo: customer
      }).then(function(response) {
        self.reset();
        return response.data.orderId;
      });
    }
  }

    /**/
  self.reset = function() {
    self.items = [];
    self.restaurant = {};
  };


  createPersistentProperty('items', 'fmCartItems', Array);
  createPersistentProperty('restaurant', 'fmCartRestaurant', Object);
  self.payment = {}; // don't keep CC info in localStorage


  function createPersistentProperty(localName, storageName, Type) {
    var json = localStorage[storageName];

    self[localName] = json ? JSON.parse(json) : new Type;

      /*https://docs.angularjs.org/api/ng/type/$rootScope.Scope*/

    $rootScope.$watch(
        function() { return self[localName]; },
        function(value) {
          if (value) {
            localStorage[storageName] = JSON.stringify(value);
          }
        },
        true);
  }
});