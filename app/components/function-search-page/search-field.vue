<template>
  <div class="ui action input">

    <input type="text" v-model="search" debounce="500"
           placeholder="Search a function..."
           class="search-field">

    <button class="ui icon button">
      <i class="search icon"></i>
    </button>

  </div>
</template>

<style>
  .search-field {
    padding: .5em .6em;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    vertical-align: middle;
    box-sizing: border-box;
    width: 100%;
    color: #333 !important;
  }
</style>

<script>
  export default{
    props: ['search'],
    watch: {
      search: function () {
        this.$dispatch('search-updated', this.search);
      }
    }
  };
</script>
