let _ = require('lodash');

exports.get = function getFunctionExpressions(content, parsedContent) {
  let functionObjects = findFunctionExpressions(parsedContent);
  return functionObjects.map(functionObject => {
    let name = `${functionObject.id.name}`;
    let lines = functionObject.loc.end.line - functionObject.loc.start.line;
    let func = content.substring(functionObject.range[0], functionObject.range[1]);
    return {
      lines,
      name: name,
      content: func
    };
  });
};

// handles syntax 'let name = function() {}' and 'let name = () => {}'
function findFunctionExpressions(obj) {
  if (_.has(obj, 'type') && obj.type === 'VariableDeclarator' && obj.init &&
      (obj.init.type === 'FunctionExpression' || obj.init.type === 'ArrowFunctionExpression')) {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === "object" ? findFunctionExpressions(v) : []), true);
}
