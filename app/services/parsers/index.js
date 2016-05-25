'use strict';

// TODO: allow for different language parsers
let jsParser = require('./js');

exports.parse = function parse (content) {
  return jsParser.getFunctions(content);
};
