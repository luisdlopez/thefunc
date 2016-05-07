import fuzzy from 'fuzzy';
var beautify = require('js-beautify').js_beautify;
import _ from 'lodash';

export const state = {
  activeProject: 0,
  projects: [{
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
    },
    functionNvigation: []
  }]
};

export const mutations = {

  SCAN_FOLDER (state, path) {
    pubsub.subscribe('scan-completed', functions => {
      let activeProject = state.projects[state.activeProject];
      activeProject.path = path;
      activeProject.scanned = true;
      activeProject.lastScan = new Date();
      activeProject.scan.parsedFunctions = functions;
      activeProject.scan.functionNames = _.map(functions, 'name');
    });

    pubsub.publish('start-scan', path);
  },

  SEARCH_FUNCTION (state, search) {
    let activeProject = state.projects[state.activeProject];
    // apply fuzzy search on name property
    activeProject.views[0].search = search;
    activeProject.views[0].results = fuzzy.filter(search, activeProject.scan.functionNames);
  },

  SHOW_PREVIEW (state, resultIndex, parsedFunctionIndex) {
    let activeProject = state.projects[state.activeProject];
    activeProject.views[0].results = activeProject.views[0].results.map((result, index) => {
      return _.assign({}, result, { clicked: index === resultIndex })
    });
    let options = {
      indent_size: 2,
      preserve_newlines: true,
      break_chained_methods: true,
      end_with_newline: true
    }
    let content = beautify(activeProject.scan.parsedFunctions[parsedFunctionIndex].content, options)
    activeProject.views[0].preview = '\n' + content;
  },

  CHANGE_ACTIVE_PROJECT (state, index) {
    state.activeProject = index;
  },

  OPEN_NEW_PROJECT (state, index) {
    state.projects.push({
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
    });
    state.activeProject = state.projects.length - 1;
  },

  CLOSE_PROJECT (state, index) {
    state.projects.$remove(index);
  },

  START_FUNCTION_NAVIGATION (state, functionString) {
    console.log('functionString: ' + functionString);
  }

};
