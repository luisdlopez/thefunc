<template>
  <div class="search-results-container">

    <h3>Functions found</h3>

    <div class="results-container">
      <table class="results">
        <tbody>
          <tr class="result" v-for="result in searchResults">
            <td>
              <div v-on:click.stop.prevent="searchResultClicked(result)">{{ result.original.name }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  props: ['searchResults'],
  methods: {
    searchResultClicked: function(result) {
      let selectedFunction = result.original;
      this.$dispatch('search-result-clicked', selectedFunction);
    }
  }
}
</script>

<style>
.search-results-container {
  display: inline-block;
  vertical-align:top;
  width: 40%;
  height: calc(100% - 68px); /* 68px might change based on top bar styling */
}

h3 {
  text-align: center;
}

.results-container {
  height: inherit;
  overflow: auto;
}

.results {
  border-spacing: 0px;
  overflow-y: auto;
  width: 100%;
}

.result {
  cursor: pointer;
}

.result:hover {
  background-color: #eee;
  color: #333;
}

</style>
