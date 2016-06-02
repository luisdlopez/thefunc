'use strict';

import Vue from 'vue';
import AppComponent from './components/app.vue';
import store from './vuex/store';

// window.$ = window.jQuery = require('../static/jquery.js');

new Vue({
  store,
  el: 'body',
  components: {
    'app': AppComponent
  }
});
