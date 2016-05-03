<template>
  <div id="app">
    <select-folder v-show="!scannedFolder"></select-folder>
    <search-function v-if="scannedFolder"></search-function>
    <search-results v-if="scannedFolder" :search-results="searchResults"></search-results>
    <function-preview v-if="functionSelected" :function-selected="functionSelected"></function-preview>
  </div>
</template>

<script>
import SelectFolderComponent from './components/select-folder.vue';
import SearchFunctionComponent from './components/search-function.vue';
import SearchResultsComponent from './components/search-results.vue';
import FunctionPreviewComponent from './components/function-preview.vue';

import { scanFolder, searchFunction, showPreview } from './vuex/actions';

export default {
  vuex: {
    actions: {
      scanFolder,
      searchFunction,
      showPreview
    },
    getters: {
      scannedFolder: state => state.scannedFolder,
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
    'search-result-clicked': function(selectedFunction) {
      this.showPreview(selectedFunction);
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
