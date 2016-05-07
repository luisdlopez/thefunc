<template>
  <div class="search-page-container">

    <search-function
          :search="activeProject.views[0].search"
          :search-results="activeProject.views[0].results">
    </search-function>

    <function-preview
          v-if="activeProject.scanned && activeProject.views[0].preview"
          :function-selected="activeProject.views[0].preview">
    </function-preview>

  </div>
</template>

<script>
import SearchFunctionComponent from './search-function.vue';
import FunctionPreviewComponent from './function-preview.vue';

export default {
  props: ['activeProject'],
  components: {
    'search-function': SearchFunctionComponent,
    'function-preview': FunctionPreviewComponent,
  },
  methods: {
    searchResultClicked: function(index) {
      this.$dispatch('search-result-clicked', index);
    }
  }
}
</script>

<style>
.search-page-container {
  height: calc(100% - 49px);
  width: 100%;
}
</style>
