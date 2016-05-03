<template>
  <div class="search-function-container">

    <div>
      <input id="search-function" type="text" v-model="search" debounce="500"
            placeholder="Search a function..."
            class="search-function">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    };
  },
  watch: {
    search: function (value) {
      this.$dispatch('search-updated', this.search);
    }
  }
}
</script>

<style>
.search-function-container {
  padding-top: 1rem;
  width: 100%;
}

.search-function-container > div {
  width: 50%;
  margin: auto;
}

.search-function {
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
