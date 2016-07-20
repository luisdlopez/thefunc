/*eslint no-console: ["error", { allow: ["log","error"] }] */

'use strict';

// TODO: file extensions should be decided by the user
// TODO: exclude folders as selected by user (node_modules as recommended)
// TODO: handle errors!

var fs = require('fs');
let parsers = require('../parsers');
import store from '../../vuex/store';
import {
  startFileParsing,
  endFileParsing,
  errorFileParsing
} from '../../vuex/actions';

exports.parseDirectoryTree = function scanFolder (directoryTree) {
  // TODO: where should functions be stored?
  let functions = [];

  function readChildren(child) {
    if (child.children) {
      child.children.forEach(readChildren);
    }
    else {
      fs.readFile(child.path, 'utf8', function(error, content) {
        if (error) console.error(`Error reading file: ${error.message}`);
        else {
          // TODO: use another process to avoid UI lock up
          try {
            startFileParsing(store, child.path);
            let parsedFunctions = parsers.parse(content);
            functions.push(...parsedFunctions);
            endFileParsing(store, child.path);
          }
          catch(parsingError) {
            errorFileParsing(store, child.path);
          }
        }
      });

    }
  }

  readChildren(directoryTree);
};
