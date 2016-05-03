// TODO: allow for different language parsers

let _ = require('lodash');
let jsParser = require('./js');

let functions = [];

exports.parse = function parse(content) {
  functions = _.flatten(_.concat(functions, jsParser.getFunctions(content)));
}

exports.getAllFunctions = function getAllFunctions() {
  return functions;
}
