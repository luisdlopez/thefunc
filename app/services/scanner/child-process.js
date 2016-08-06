/*eslint no-console: ["error", { allow: ["log","error"] }] */

'use strict';

var fs = require('fs');
let parsers = require('../parsers');

function readChildren(child) {
  if (child.children) {
    child.children.forEach(readChildren);
  }
  else {
    fs.readFile(child.path, 'utf8', function(error, content) {
      if (error) console.error(`Error reading file: ${error.message}`);
      else {
        try {
          process.send({ action: 'startFileParsing', params: [child.path] });
          process.send({ action: 'setFileFunctions', params: [child.path, parsers.parse(content)] });
          process.send({ action: 'endFileParsing', params: [child.path] });
        }
        catch(parsingError) {
          process.send({ action: 'errorFileParsing', params: [child.path] });
        }
      }
    });

  }
}

process.on('message', directoryTree => {
  readChildren(directoryTree);
});
