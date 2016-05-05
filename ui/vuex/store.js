import fuzzy from 'fuzzy';
import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger'

Vue.use(Vuex);

const state = {
  active: true,
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
};

const mutations = {

  SCAN_FOLDER (state, path) {
    pubsub.subscribe('scan-completed', functions => {
      state.path = path;
      state.scanned = true;
      state.lastScan = new Date();
      state.scan.parsedFunctions = functions;
      state.scan.functionNames = _.map(functions, 'name');
    });

    pubsub.publish('start-scan', path);
  },

  SEARCH_FUNCTION (state, search) {
    // apply fuzzy search on name property
    state.searchPage.search = search;
    state.searchPage.results = fuzzy.filter(search, state.scan.functionNames);
  },

  SHOW_PREVIEW (state, index) {
    state.searchPage.preview = state.scan.parsedFunctions[index].content;
  }

};

export default new Vuex.Store({
  state,
  mutations,
  middlewares: [createLogger()]
});
