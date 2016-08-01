'use strict';

const shortid = require('shortid');
const _ = require('lodash');

exports.get = function getAssignmentExpressions (content, parsedContent) {
  let functionObjects = findFunctionsInAssignmentExpressions(parsedContent);
  return functionObjects.map(functionObject => {
    const id = shortid.generate();
    const name = `${functionObject.left.object.name}.${functionObject.left.property.name}`;
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

// handles syntax 'exports.test = () => {}' and 'exports.test = function() {}'
function findFunctionsInAssignmentExpressions (obj) {
  if (_.has(obj, 'type') && obj.type === 'AssignmentExpression' && obj.right &&
      (obj.right.type === 'FunctionExpression' || obj.right.type === 'ArrowFunctionExpression')) {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === 'object' ? findFunctionsInAssignmentExpressions(v) : []), true);
}
