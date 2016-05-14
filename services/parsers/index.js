// TODO: allow for different language parsers

let _ = require('lodash');
let jsParser = require('./js');

exports.parse = function parse(content) {
  return jsParser.getFunctions(content);
};
