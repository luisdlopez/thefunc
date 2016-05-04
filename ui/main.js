import Vue from 'vue';
import AppComponent from './components/app.vue';
import store from './vuex/store'

new Vue({
  store,
  el: 'body',
  components: {
    'app': AppComponent
  }
});
