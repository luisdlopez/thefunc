/*eslint no-console: ["error", { allow: ["log"] }] */
'use strict';

const searchService = require('../../services/function-search');
const scanner = require('../../services/scanner');
const beautify = require('js-beautify').js_beautify;
import _ from 'lodash';

const jsBeautifyOptions = {
  indent_size: 2,
  preserve_newlines: true,
  break_chained_methods: true,
  end_with_newline: true
};

const newProjectTemplate = {
  path: '',
  scanned: false,
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

  SCAN_FOLDER (state, path) {
    scanner
      .scanFolder(path)
      .then(functions => {
        let activeProject = state.projects[state.activeProject];
        activeProject.path = path;
        activeProject.scanned = true;
        activeProject.lastScan = new Date();
        activeProject.scan.parsedFunctions = functions;
        activeProject.scan.functionNames = _.map(functions, 'name');
      });
  },

  SEARCH_FUNCTION (state, search) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views[0].results = searchService.search(activeProject, search);
  },

  SHOW_PREVIEW (state, resultIndex, parsedFunctionIndex) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views[0].results = activeProject.views[0].results.map((result, index) => {
      return _.assign({}, result, {clicked: index === resultIndex});
    });
    let formattedContent = beautify(activeProject.scan.parsedFunctions[parsedFunctionIndex].content, jsBeautifyOptions);
    activeProject.views[0].preview = `\n${formattedContent}`;
  },

  CHANGE_ACTIVE_PROJECT (state, index) {
    state.activeProject = index;
  },

  OPEN_NEW_PROJECT (state) {
    state.projects.push(_.cloneDeepWith(newProjectTemplate));
    state.activeProject = state.projects.length - 1;
  },

  CLOSE_PROJECT (state, index) {
    state.projects.splice(index, 1);
    state.activeProject = index - 1;
  },

  CHANGE_ACTIVE_VIEW (state, index) {
    let activeProject = state.projects[state.activeProject];
    activeProject.activeView = index;
  },

  CLOSE_VIEW_TAB (state, index) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views.splice(index, 1);
    activeProject.activeView = index - 1;
  },

  START_FUNCTION_NAVIGATION (state, parsedFunctionIndex) {
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

  OPEN_FUNCTION (state, options) {
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
