'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';
import { state, mutations } from './modules/thefunc';

Vue.use(Vuex);

function getMiddlewares() {
  if(process.env.NODE_ENV !== 'production') {
    return [createLogger()];
  }
  else {
    return [];
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares: getMiddlewares()
});

if (module.hot) {
  // accept actions and mutationsTypes as hot modules
  module.hot.accept(['./modules/thefunc'], () => {
    // require the updated modules
    // have to add .default here due to babel 6 module output
    const newState = require('./modules/thefunc').state;
    const newMutations = require('./modules/thefunc').mutations;
    // swap in the new actions and mutationsTypes
    store.hotUpdate({
      state: newState,
      mutations: newMutations
    });
  });
}

export default store;
