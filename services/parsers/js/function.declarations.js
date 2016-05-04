let _ = require('lodash');

exports.get = function getFunctionDeclarations(content, parsedContent) {
  let functionObjects = findFunctionDeclarations(parsedContent);
  return functionObjects.map(functionObject => {
    let name = `${functionObject.id.name}`;
    let func = content.substring(functionObject.range[0], functionObject.range[1]);
    return {
      name: name,
      content: func
    };
  });
};

// handles syntax 'function name() {}'
function findFunctionDeclarations(obj) {
  if (_.has(obj, 'type') && obj.type === 'FunctionDeclaration') {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === "object" ? findFunctionDeclarations(v) : []), true);
}
