/*eslint no-console: ["error", { allow: ["log","error"] }] */

'use strict';

// TODO: file extensions should be decided by the user
// TODO: exclude folders as selected by user (node_modules as recommended)
// TODO: handle errors!

const fs = require('fs');
const parsers = require('../parsers');
// import store from '../../vuex/store';
// import * as actions from '../../vuex/actions';

function readChildren(child) {
  if (child.children) {
    child.children.forEach(readChildren);
  }
  else {
    fs.readFile(child.path, 'utf8', function(error, content) {
      if (error) console.error(`Error reading file: ${error.message}`);
      else {
        parsers.parse(child.path, content);
        // try {
        //   actions.startFileParsing(store, child.path);
        //   actions.setFileFunctions(store, child.path, parsers.parse(content));
        //   actions.endFileParsing(store, child.path);
        // }
        // catch(parsingError) {
        //   actions.errorFileParsing(store, child.path);
        // }
      }
    });

  }
}

exports.parseDirectoryTree = function scanFolder (directoryTree) {

  readChildren(directoryTree);

};
