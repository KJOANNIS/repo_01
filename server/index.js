//node modules
var express = require('express');
var fs = require('fs');
var open = require('open');

//local modules
var RestaurantRecord = require('./model').Restaurant; //since we need to call once
var MemoryStorage = require('./storage').Memory;      //since we need to call once

var API_URL = '/api/restaurant';
var API_URL_ID = API_URL + '/:id';
var API_URL_ORDER = '/api/order';

var removeMenuItems = function(restaurant) {
  var clone = {};

  Object.getOwnPropertyNames(restaurant).forEach(function(key) {
    if (key !== 'menuItems') {
      clone[key] = restaurant[key];
    }
  });
  return clone;
};

//multiple instance can be created
exports.start = function(PORT, STATIC_DIR, DATA_FILE, TEST_DIR) {
  var app = express();
  var storage = new MemoryStorage();

  // log requests
  app.use(express.logger('dev'));

  // serve static files for demo client
  app.use(express.static(STATIC_DIR));

  // parse body into req.body
  app.use(express.bodyParser());

  // To send new set of restaurant using map
  app.get(API_URL, function(req, res, next) {
      /*http://api.jquery.com/jquery.map/*/
    res.send(200, storage.getAll().map(removeMenuItems));
  });

  /*Add new restaurant which is currently not implemented*/
  app.post(API_URL, function(req, res, next) {
    var restaurant = new RestaurantRecord(req.body);
    var errors = [];

    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });

   /*On successful payment send the response with date as order Id :)*/
   app.post(API_URL_ORDER, function(req, res, next) {
    return res.send(201, { orderId: Date.now()});
  });

    /*get the menu of the restaurant based on it's id*/
  app.get(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);
    if (restaurant) {
      return res.send(200, restaurant);
    }

    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });


   /*update of restaurant details*/
  app.put(API_URL_ID, function(req, res, next) {
    var restaurant = storage.getById(req.params.id);
    var errors = [];

    if (restaurant) {
      restaurant.update(req.body);
      return res.send(200, restaurant);
    }

    restaurant = new RestaurantRecord(req.body);
    if (restaurant.validate(errors)) {
      storage.add(restaurant);
      return res.send(201, restaurant);
    }

    return res.send(400, {error: errors});
  });


    /*delete of order*/
  app.del(API_URL_ID, function(req, res, next) {
      console.log(req.params.id + "  TTTTTT");
    if (storage.deleteById(req.params.id)) {
      return res.send(204, null);
    }

    return res.send(400, {error: 'No restaurant with id "' + req.params.id + '"!'});
  });


  // only for running e2e tests
  app.use('/test/', express.static(TEST_DIR));

  // read the data from json and start the server
  fs.readFile(DATA_FILE, function(err, data) {
    JSON.parse(data).forEach(function(restaurant) {
      storage.add(new RestaurantRecord(restaurant));
    });

    app.listen(PORT, function() {
      open('http://localhost:' + PORT + '/');
    });
  });


  // Windows and Node.js before 0.8.9 would crash
  // https://github.com/joyent/node/issues/1553

  try {
    process.on('SIGINT', function() {
      // save the storage back to the json file
      fs.writeFile(DATA_FILE, JSON.stringify(storage.getAll()), function() {
        process.exit(0);
      });
    });
  } catch (e) {}

};
