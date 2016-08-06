/*eslint no-console: ["error", { allow: ["log","error"] }] */

'use strict';

// TODO: file extensions should be decided by the user
// TODO: exclude folders as selected by user (node_modules as recommended)
// TODO: handle errors!

import store from '../../vuex/store';
import * as actions from '../../vuex/actions';

exports.parseDirectoryTree = function scanFolder (directoryTree) {

  var cp = require('child_process');
  var child = cp.fork('app/services/scanner/child-process.js');

  child.send(directoryTree);

  child.on('message', function({ action, params }) {
    actions[action](store, ...params);
  });

};
