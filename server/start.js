/*https://www.jetbrains.com/webstorm/help/node-js.html#coreModuleSources*/
//http://stackoverflow.com/questions/22213980/could-someone-explain-what-process-argv-means-in-node-js-please
//https://github.com/clvv/scriptbroadcast/blob/master/bin/scriptbroadcast

var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 3000;
var STATIC_DIR = __dirname + '/../app';
var TEST_DIR = __dirname + '/../test';
var DATA_FILE = __dirname + '/data/restaurantsParsedJson.json';

/*if we need to call only once*/
require('./index').start(PORT, STATIC_DIR, DATA_FILE, TEST_DIR);