<template>
  <div class="search-container">

    <div class="search-field-container">
      <search-field :search="search"></search-field>
    </div>

    <div class="results-container">
      <search-results :search-results="searchResults"></search-results>
    </div>

  </div>
</template>

<script type="text/babel">
  import SearchResultsComponent from './search-results.vue';
  import SearchFieldComponent from './search-field.vue';

  export default {
    props: ['search', 'searchResults'],
    components: {
      'search-results': SearchResultsComponent,
      'search-field': SearchFieldComponent
    }
  };
</script>

<style>
  .search-container {
    padding-left: 5px;
    display: inline-block;
    vertical-align:top;
    width: 40%;
    height: 100%;
  }

  .search-field-container {
    margin: 10px auto;
    width: 80%;
  }

  .results-container {
    height: calc(100% - 63px);
    overflow: auto;
  }
</style>
