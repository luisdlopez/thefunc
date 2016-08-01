'use strict';

const shortid = require('shortid');
const _ = require('lodash');

exports.get = function getFunctionDeclarations (content, parsedContent) {
  let functionObjects = findFunctionDeclarations(parsedContent);
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

// handles syntax 'function name() {}'
function findFunctionDeclarations (obj) {
  if (_.has(obj, 'type') && obj.type === 'FunctionDeclaration') {
    return [obj];
  }

  return _.flatten(_.map(obj, v => typeof v === 'object' ? findFunctionDeclarations(v) : []), true);
}
