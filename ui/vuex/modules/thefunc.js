import fuzzy from 'fuzzy';
import _ from 'lodash';

export const state = {
  activeProject: 0,
  projects: [{
    path: '',
    scanned: false,
    lastScan: null,
    searchPage: {
      active: false,
      search: '',
      results: [],
      preview: ''
    },
    scan: {
      parsedFunctions: [],
      functionNames: [],
      error: [],
      stats: {}
    }
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
    activeProject.searchPage.search = search;
    activeProject.searchPage.results = fuzzy.filter(search, activeProject.scan.functionNames);
  },

  SHOW_PREVIEW (state, index) {
    let activeProject = state.projects[state.activeProject];
    activeProject.searchPage.preview = activeProject.scan.parsedFunctions[index].content;
  },

  CHANGE_ACTIVE_PROJECT (state, index) {
    state.activeProject = index;
  },

  OPEN_NEW_PROJECT (state, index) {
    state.projects.push({
      path: '',
      scanned: false,
      lastScan: null,
      searchPage: {
        active: false,
        search: '',
        results: [],
        preview: ''
      },
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
  }

};