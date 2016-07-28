<template>
  <div class="directory-tree-container">
    <div class="search-field-container">
      <input type="text"
             placeholder="Search a function..."
             class="search-field">
    </div>
    <ul class="directory-tree">
      <item :model="root"></item>
    </ul>
  </div>
</template>

<script type="text/babel">
  import item from './item.vue';

  export default {
    components: {
      item
    },
    vuex: {
      getters: {
        root: state => state.projects[state.activeProject].directoryTree
      }
    }
  };
</script>

<style>
  .directory-tree-container {
    height: calc(100% - 54px);
    display: inline-block;
    width: 40%;
    overflow: auto;
  }

  .search-field-container {
    width: 80%;
    margin: 10px auto;
  }

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

  .directory-tree {
    padding-left: 0px;
  }
</style>
