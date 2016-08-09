'use strict';

import _ from 'lodash';

// returns mapping function for approximate function search
function matchToSearch(search) {
  const formattedSearch = search.toLowerCase();

  return (parsedFunction, index) => {
    const formattedFunctionName = parsedFunction.name.toLowerCase();
    const match = formattedFunctionName.includes(formattedSearch);
    if (match) {
      return { name: parsedFunction.name, index };
    }
    return null;
  };
}

// returns mapping function for exact search
function mapToFunctionName(functionName) {
  return (parsedFunction, index) => {
    const match = parsedFunction.name === functionName;
    if (match) {
      // return { name: parsedFunction.name, index };
      return { func: parsedFunction, index };
    }
    return null;
  };
}

// called on main function search - from user input (approximate match)
exports.search = (activeProject, search) => {
  const parsedFunctions = activeProject.scan.parsedFunctions;
  const results = parsedFunctions.map(matchToSearch(search));
  return results.filter(result => !!result);
};

// called from ace editor, function navigation (exact search)
exports.navigate = (activeProject, functionName) => {
  const parsedFunctions = activeProject.scan.parsedFunctions;
  let results = _.map(parsedFunctions, mapToFunctionName(functionName));
  return results.filter(result => !!result);
};
