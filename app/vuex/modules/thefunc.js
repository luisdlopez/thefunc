/*eslint no-console: ["error", { allow: ["log"] }] */
'use strict';

import * as mutationsTypes from '../mutation-types';
const searchService = require('../../services/function-search');
const beautify = require('js-beautify').js_beautify;
const FILE_STATE = require('../../services/parsers/file.state.enum');
import _ from 'lodash';

const jsBeautifyOptions = {
  indent_size: 2,
  preserve_newlines: true,
  break_chained_methods: true,
  end_with_newline: true
};

const newProjectTemplate = {
  path: '',
  directoryTree: null,
  scanned: false,
  parsed: FILE_STATE.NOT_PARSED,
  lastScan: null,
  activeView: 0,
  views: [{
    title: 'Search',
    search: '',
    results: [],
    preview: ''
  }],
  scan: {
    parsedFunctions: [],
    functionNames: [],
    error: [],
    stats: {}
  }
};

export const state = {
  activeProject: 0,
  projects: [_.cloneDeepWith(newProjectTemplate)]
};

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
    activeProject.views[0].results = searchService.search(activeProject, search);
  },

  [mutationsTypes.SHOW_PREVIEW] (state, resultIndex, parsedFunctionIndex) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views[0].results = activeProject.views[0].results.map((result, index) => {
      return _.assign({}, result, {clicked: index === resultIndex});
    });
    let formattedContent = beautify(activeProject.scan.parsedFunctions[parsedFunctionIndex].content, jsBeautifyOptions);
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

  [mutationsTypes.START_FUNCTION_NAVIGATION] (state, parsedFunctionIndex) {
    let activeProject = state.projects[state.activeProject];
    let func = activeProject.scan.parsedFunctions[parsedFunctionIndex];
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
