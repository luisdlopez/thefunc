/*eslint no-console: ["error", { allow: ["log"] }] */

'use strict';

// TODO: file extensions should be decided by the user
// TODO: exclude folders as selected by user (node_modules as recommended)
// TODO: handle errors!

let dir = require('node-dir');
let parsers = require('../parsers');

exports.scanFolder = function scanFolder (folder) {
  let functions = [];

  function fileCallback (error, content, next) {
    if (error) {
      // TODO: add errors in a log to show user
      next();
    }

    try {
      let parsedFunctions = parsers.parse(content);
      functions.push(...parsedFunctions);
    } catch (error) {
      // TODO: add errors in a log to show user
    }

    next();
  }

  return new Promise((resolve, reject) => {
    let options = {
      match: /.js$/,
      excludeDir: ['node_modules', 'dist', 'build', 'static']
    };

    function finishedCallback (error) {
      if (error) reject(error);
      resolve(functions);
    }

    dir.readFiles(folder, options, fileCallback, finishedCallback);
  });
};
