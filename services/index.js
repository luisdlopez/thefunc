'use strict';

let pubsub = require('./pubsub');
let scanner = require('./scanner');

function startScan(path) {
  return scanner
    .scanFolder(path)
    .then(functions => pubsub.publish('scan-completed', functions));
}

pubsub.subscribe('start-scan', startScan);
