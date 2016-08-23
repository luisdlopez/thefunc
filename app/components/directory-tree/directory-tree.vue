<template>
  <div class="directory-tree-container">
    <div class="search-field-container">
      <input type="text"
             v-model="searchInputValue"
             @keyup="searchFunction(searchInputValue.trim())"
             placeholder="Search a function..."
             class="search-field">
    </div>

    <!--Show normal tree if no search has been entered-->
    <ul class="directory-tree" v-if="!filteredRoot">
      <item :model="root"></item>
    </ul>

    <!--Show filtered tree based on search string-->
    <ul class="directory-tree" v-if="filteredRoot">
      <item :model="filteredRoot"></item>
    </ul>

  </div>
</template>

<script type="text/babel">
  import { searchFunction } from '../../vuex/actions';
  import item from './item.vue';

  export default {
    components: {
      item
    },
    data() {
      return {
        searchInputValue: ''
      };
    },
    vuex: {
      getters: {
        root: state => state.projects[state.activeProject].directoryTree,
        filteredRoot: state => state.projects[state.activeProject].views[0].filteredDirectoryTree,
        search: state => state.projects[state.activeProject].views[0].search
      },
      actions: {
        searchFunction
      }
    },
    ready() {
      this.searchInputValue = this.search;
    },
    watch: {
      'search': function() {
        this.searchInputValue = this.search;
      }
    }
  };
</script>

<style lang="scss" scoped>
.directory-tree-container {
  padding: 5px;
  background-color: #000000;
  height: calc(100% - 3px);
  display: inline-block;
  width: 40%;
  overflow: auto;

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
    background-color: #181A1F;
  }

  .directory-tree {
    padding-left: 0px;
  }
}
</style>
