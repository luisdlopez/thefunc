let _ = require('lodash');

exports.get = function getAssignmentExpressions(content, parsedContent) {
  let functionObjects = findFunctionsInAssignmentExpressions(parsedContent);
  return functionObjects.map(functionObject => {
    let name = `${functionObject.left.object.name}.${functionObject.left.property.name}`;
    let func = content.substring(functionObject.range[0], functionObject.range[1]);
    return {
      name: name,
      content: func
    };
  });
};

// handles syntax 'exports.test = () => {}' and 'exports.test = function() {}'
function findFunctionsInAssignmentExpressions(obj) {
  if (_.has(obj, 'type') && obj.type === 'AssignmentExpression' && obj.right &&
      (obj.right.type === 'FunctionExpression' || obj.right.type === 'ArrowFunctionExpression')) {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === "object" ? findFunctionsInAssignmentExpressions(v) : []), true);
}
