import Vue from 'vue';
import AppComponent from './app.vue';
import store from './vuex/store'

new Vue({
  store,
  el: 'body',
  components: {
    'app': AppComponent
  }
});
