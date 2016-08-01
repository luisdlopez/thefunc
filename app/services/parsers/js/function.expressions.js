'use strict';

const shortid = require('shortid');
const _ = require('lodash');

exports.get = function getFunctionExpressions (content, parsedContent) {
  let functionObjects = findFunctionExpressions(parsedContent);
  return functionObjects.map(functionObject => {
    const id = shortid.generate();
    const name = `${functionObject.id.name}`;
    const lines = functionObject.loc.end.line - functionObject.loc.start.line;
    const func = content.substring(functionObject.range[0], functionObject.range[1]);
    return {
      id,
      lines,
      name,
      content: func
    };
  });
};

// handles syntax 'let name = function() {}' and 'let name = () => {}'
function findFunctionExpressions (obj) {
  if (_.has(obj, 'type') && obj.type === 'VariableDeclarator' && obj.init &&
      (obj.init.type === 'FunctionExpression' || obj.init.type === 'ArrowFunctionExpression')) {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === 'object' ? findFunctionExpressions(v) : []), true);
}
