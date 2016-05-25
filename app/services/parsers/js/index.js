'use strict';

let esprima = require('esprima');
let _ = require('lodash');

let functionDeclarations = require('./function.declarations');
let functionExpressions = require('./function.expressions');
let assignmentExpressions = require('./assignment.expressions');

exports.getFunctions = function getFunctions (content) {
  let options = {range: true, loc: true};

  // tell esprima to parse file as ES6 module
  if (content.indexOf('import') !== -1 || content.indexOf('export ') !== -1) {
    options = _.assign({}, options, {sourceType: 'module'});
  }

  let parsedContent = esprima.parse(content, options);

  let functions = _.concat(
    functionDeclarations.get(content, parsedContent),
    functionExpressions.get(content, parsedContent),
    assignmentExpressions.get(content, parsedContent)
  );

  return functions;
};
