/*eslint no-console: ["error", { allow: ["log"] }] */
'use strict';

import * as mutationsTypes from '../mutation-types';
const beautify = require('js-beautify').js_beautify;
const FILE_STATE = require('../../services/parsers/file.state.enum');
import _ from 'lodash';
import newProjectTemplate from './project.template';

const jsBeautifyOptions = {
  indent_size: 2,
  preserve_newlines: true,
  break_chained_methods: true,
  end_with_newline: true
};

export const state = {
  activeProject: 0,
  projects: [_.cloneDeepWith(newProjectTemplate)]
};

// TODO: findPath function is repeated, extract it

export const mutations = {

  [mutationsTypes.BUILD_DIRECTORY_TREE] (state, path, tree) {
    let activeProject = state.projects[state.activeProject];
    activeProject.path = path;
    activeProject.directoryTree = tree;
    if (activeProject.directoryTree.children) {
      activeProject.directoryTree.opened = true;
    }
    activeProject.scanned = true;
    activeProject.lastScan = new Date();
  },

  [mutationsTypes.TOGGLE_FOLDER] (state, path) {
    function findPath(item) {
      if (item.path === path) {
        item.opened = !item.opened;
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }
    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.TOGGLE_FILE] (state, path) {
    function findPath(item) {
      if (item.path === path) {
        item.opened = !item.opened;
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }
    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.START_PROJECT_PARSING] (state) {
    state.projects[state.activeProject].parsed = FILE_STATE.PARSING;
  },

  [mutationsTypes.START_FILE_PARSING] (state, path) {
    function findPath(item) {
      if (item.path === path) {
        item.parsed = FILE_STATE.PARSING;
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }
    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.ERROR_FILE_PARSING] (state, path) {
    function findPath(item) {
      if (item.path === path) {
        item.parsed = FILE_STATE.PARSING_ERROR;
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }
    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.SET_FILE_FUNCTIONS] (state, path, functions) {
    function findPath(item) {
      if (item.path === path) {
        item.functions = functions.map(func => func.id);
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }

    const parsedFunctionsObject = state.projects[state.activeProject].scan.parsedFunctions;
    const functionNamesArray = state.projects[state.activeProject].scan.functionNames;

    functions.forEach(func => {
      parsedFunctionsObject[func.id] = func;
      functionNamesArray.push(func.name);
    });

    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.END_FILE_PARSING] (state, path) {
    function findPath(item) {
      if (item.path === path) {
        item.parsed = FILE_STATE.PARSED;
        return true;
      }
      else if (item.children) {
        item.children.some(child => findPath(child));
      }
    }
    findPath(state.projects[state.activeProject].directoryTree);
  },

  [mutationsTypes.START_PROJECT_PARSING] (state) {
    state.projects[state.activeProject].parsed = FILE_STATE.PARSED;
  },

  [mutationsTypes.SEARCH_FUNCTION] (state, search) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views[0].search = search;

    if (!search) {
      activeProject.views[0].filteredDirectoryTree = null;
      return;
    }

    // find function names
    const includesSearch = func => func.name.toLowerCase().includes(search) ? func.id : null;
    const functionsFound = _.map(activeProject.scan.parsedFunctions, includesSearch)
      .filter(found => !!found);

    // copy directory tree
    let filteredDirectoryTree = _.cloneDeepWith(activeProject.directoryTree);

    // remove items that don't match found functions
    function findItems(item) {
      if (item.children) {
        item.children = item.children.map(findItems);
        item.children = item.children.filter(child => !!child);
        if (item.children.length) {
          item.opened = true;
          return item;
        }
        return null;
      }
      else {
        if (item.functions) {
          item.functions = item.functions.map(id => {
            if (functionsFound.indexOf(id) !== -1) {
              return id;
            }
            return null;
          });
          item.functions = item.functions.filter(func => !!func);
          if (item.functions.length) {
            item.opened = true;
            return item;
          }
          return null;
        }
        else {
          return null;
        }
      }
    }

    const results = findItems(filteredDirectoryTree);
    activeProject.views[0].filteredDirectoryTree = results;
  },

  [mutationsTypes.SHOW_PREVIEW] (state, id) {
    const activeProject = state.projects[state.activeProject];
    const func = activeProject.scan.parsedFunctions[id];
    let formattedContent = beautify(func.content, jsBeautifyOptions);
    activeProject.views[0].preview = `\n${formattedContent}`;
  },

  [mutationsTypes.CHANGE_ACTIVE_PROJECT] (state, index) {
    state.activeProject = index;
  },

  [mutationsTypes.OPEN_NEW_PROJECT] (state) {
    state.projects.push(_.cloneDeepWith(newProjectTemplate));
    state.activeProject = state.projects.length - 1;
  },

  [mutationsTypes.CLOSE_PROJECT] (state, index) {
    state.projects.splice(index, 1);
    state.activeProject = index - 1;
  },

  [mutationsTypes.CHANGE_ACTIVE_VIEW] (state, index) {
    let activeProject = state.projects[state.activeProject];
    activeProject.activeView = index;
  },

  [mutationsTypes.CLOSE_VIEW_TAB] (state, index) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views.splice(index, 1);
    activeProject.activeView = index - 1;
  },

  [mutationsTypes.START_FUNCTION_NAVIGATION] (state, functionId) {
    let activeProject = state.projects[state.activeProject];
    let func = activeProject.scan.parsedFunctions[functionId];
    let formattedContent = beautify(func.content, jsBeautifyOptions);

    activeProject.views.push({
      title: func.name,
      functions: [
        [_.assign({}, func, {content: `\n${formattedContent}`})]
      ]
    });
    activeProject.activeView = activeProject.views.length - 1;
  },

  [mutationsTypes.OPEN_FUNCTION] (state, options) {
    const activeProject = state.projects[state.activeProject];
    const activeView = activeProject.views[activeProject.activeView];

    const func = options.func;
    const formattedContent = beautify(func.content, jsBeautifyOptions);
    const columnIndex = options.position[0] + 1;

    if (!activeView.functions[columnIndex]) {
      activeView.functions.push([_.assign({}, func, {content: `\n${formattedContent}`})]);
    }
    else {
      activeView.functions[columnIndex].push(_.assign({}, func, {content: `\n${formattedContent}`}));
    }
  }

};
