import fuzzy from 'fuzzy';
var beautify = require('js-beautify').js_beautify;
import _ from 'lodash';

let jsBeautifyOptions = {
  indent_size: 2,
  preserve_newlines: true,
  break_chained_methods: true,
  end_with_newline: true
};

let newProjectTemplate = {
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
  projects: [_.assign({}, newProjectTemplate)]
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
    let formattedContent = beautify(activeProject.scan.parsedFunctions[parsedFunctionIndex].content, jsBeautifyOptions);
    activeProject.views[0].preview = `\n${formattedContent}`;
  },

  CHANGE_ACTIVE_PROJECT (state, index) {
    state.activeProject = index;
  },

  OPEN_NEW_PROJECT (state, index) {
    state.projects.push(_.assign({}, newProjectTemplate));
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

  START_FUNCTION_NAVIGATION (state, functionName, parsedFunctionIndex) {
    let activeProject = state.projects[state.activeProject];
    let func = activeProject.scan.parsedFunctions[parsedFunctionIndex];
    let formattedContent = beautify(func.content, jsBeautifyOptions);

    activeProject.views.push({
      title: functionName,
      functions: [
        // [`\n${content}`]
        [_.assign({}, func, { content: `\n${formattedContent}` })]
      ]
    });
    activeProject.activeView = activeProject.views.length - 1
  },

  OPEN_FUNCTION (state, options) {
    let activeProject = state.projects[state.activeProject];
    let activeView = activeProject.views[activeProject.activeView];
    let parsedFunctions = activeProject.scan.parsedFunctions;

    let func = parsedFunctions.find(func => func.name.includes(options.functionName));
    let formattedContent = beautify(func.content, jsBeautifyOptions);
    let columnIndex = options.position[0] + 1;

    if (!activeView.functions[columnIndex]) {
      activeView.functions.push([_.assign({}, func, { content: `\n${formattedContent}` })]);
    }
    else {
      activeView.functions[columnIndex].push(_.assign({}, func, { content: `\n${formattedContent}` }));
    }
  }

};
