let parsers = require('../../parsers');
import fuzzy from 'fuzzy';
import _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  scannedFolder: '',
  functions: [],
  searchPage: {
    search: '',
    results: [],
    preview: ''
  }
};

const mutations = {

  SCAN_FOLDER (state, path) {

    pubsub.subscribe('scan-completed', functions => {
      state.scannedFolder = path;
      state.functions = functions;
    });

    pubsub.publish('start-scan', path);
  },

  SEARCH_FUNCTION (state, search) {
    // apply fuzzy search on name property
    let options = {
      extract: functionObject => functionObject.name
    };
    state.searchPage.search = search;
    state.searchPage.results = fuzzy.filter(search, state.functions, options);
  },

  SHOW_PREVIEW (state, selectedFunction) {
    state.searchPage.preview = selectedFunction;
  }

};

export default new Vuex.Store({
  state,
  mutations
});
