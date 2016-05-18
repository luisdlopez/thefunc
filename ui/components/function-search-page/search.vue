<template>
  <div class="search-container">

    <div class="search-field-container">
      <div class="ui action input">
        <input type="text" v-model="search" debounce="500"
              placeholder="Search a function..."
              class="search-field">
        <button class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
    </div>

    <div class="results-container">
      <table class="ui selectable celled table">
        <tbody>
          <tr v-for="(index, result) in searchResults">
            <td class="result" v-bind:class="{ 'positive': result.clicked }">
              <div v-on:click.stop.prevent="searchResultClicked(index, result.index)">
                {{ result.string }}
                <i v-bind:class="{ 'arrow circle outline right icon result-icon': result.clicked }"
                      v-on:click.stop.prevent="startFunctionNavigation(result.string, result.index)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script type="text/babel">
  export default {
    props: ['search', 'searchResults'],
    watch: {
      search: function () {
        this.$dispatch('search-updated', this.search);
      }
    },
    methods: {
      searchResultClicked: function(resultIndex, parsedFunctionIndex) {
        this.$dispatch('search-result-clicked', resultIndex, parsedFunctionIndex);
      },
      startFunctionNavigation: function(functionString, parsedFunctionIndex) {
        this.$dispatch('start-function-navigation', functionString, parsedFunctionIndex);
      }
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

  .results-container {
    height: calc(100% - 63px);
    overflow: auto;
  }

  .result {
    cursor: pointer;
  }

  .result-icon {
    float: right;
  }
</style>
