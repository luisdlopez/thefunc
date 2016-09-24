/*eslint no-console: ["error", { allow: ["log","error"] }] */

'use strict';

// TODO: file extensions should be decided by the user
// TODO: exclude folders as selected by user (node_modules as recommended)
// TODO: handle errors!

var fs = require('graceful-fs');
const parsers = require('../parsers');

function readChildren(child) {
  if (child.children) {
    child.children.forEach(readChildren);
  }
  else {
    fs.readFile(child.path, 'utf8', function(error, content) {
      if (error) console.error(`Error reading file: ${error.message}`);
      else {
        parsers.parse(child.path, content);
      }
    });
  }
}

exports.parseDirectoryTree = function scanFolder (directoryTree) {

  readChildren(directoryTree);

};
