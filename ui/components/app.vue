<template>
  <div id="app">
    <select-folder v-show="!scanned"></select-folder>
    <search-function v-if="scanned"></search-function>
    <search-results v-if="scanned" :search-results="searchResults"></search-results>
    <function-preview v-if="scanned && functionSelected" :function-selected="functionSelected"></function-preview>
  </div>
</template>

<script>
import SelectFolderComponent from './select-folder.vue';
import SearchFunctionComponent from './search-function.vue';
import SearchResultsComponent from './search-results.vue';
import FunctionPreviewComponent from './function-preview.vue';

import { scanFolder, searchFunction, showPreview } from '../vuex/actions';

export default {
  vuex: {
    actions: {
      scanFolder,
      searchFunction,
      showPreview
    },
    getters: {
      scannedFolder: state => state.path,
      scanned: state => state.scanned,
      searchResults: state => state.searchPage.results,
      functionSelected: state => state.searchPage.preview
    }
  },
  components: {
    'select-folder': SelectFolderComponent,
    'search-function': SearchFunctionComponent,
    'search-results': SearchResultsComponent,
    'function-preview': FunctionPreviewComponent
  },
  events: {
    'folder-selected': function (path) {
      this.scanFolder(path);
    },
    'search-updated': function(search) {
      this.searchFunction(search);
    },
    'search-result-clicked': function(index) {
      this.showPreview(index);
    },
  }
}

</script>

<style>
#app {
  height:100%;
  margin:0;
}
</style>
