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
      <table class="ui single line table">
        <tbody>
          <tr v-for="result in searchResults">
            <td class="result">
              <div v-on:click.stop.prevent="searchResultClicked(result.index)">{{ result.string }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  props: ['search', 'searchResults'],
  watch: {
    search: function (value) {
      this.$dispatch('search-updated', this.search);
    }
  },
  methods: {
    searchResultClicked: function(index) {
      this.$dispatch('search-result-clicked', index);
    }
  }
}
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

.result:hover {
  background-color: #eee;
}
</style>
