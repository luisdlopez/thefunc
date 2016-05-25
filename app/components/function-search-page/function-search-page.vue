<template>
  <div class="search-page-container">

    <search
          :search="activeProject.views[0].search"
          :search-results="activeProject.views[0].results">
    </search>

    <preview
          v-if="activeProject.scanned && activeProject.views[0].preview"
          :function-selected="activeProject.views[0].preview">
    </preview>

  </div>
</template>

<script type="text/babel">
  import SearchComponent from './search-container.vue';
  import PreviewComponent from './preview-container.vue';

  export default {
    props: ['activeProject'],
    components: {
      'search': SearchComponent,
      'preview': PreviewComponent
    },
    methods: {
      searchResultClicked: function(index) {
        this.$dispatch('search-result-clicked', index);
      }
    }
  };
</script>

<style>
  .search-page-container {
    height: calc(100% - 49px);
    width: 100%;
  }
</style>
