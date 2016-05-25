<template>
  <table class="ui selectable celled table">
    <tbody>
      <tr v-for="(index, result) in searchResults">

        <td class="result" v-bind:class="{ 'positive': result.clicked }">

          <div v-on:click.stop.prevent="searchResultClicked(index, result.index)">
            {{ result.name }}
            <i v-bind:class="{ 'arrow circle outline right icon result-icon': result.clicked }"
               v-on:click.stop.prevent="startFunctionNavigation(result.string, result.index)"></i>
          </div>

        </td>

      </tr>
    </tbody>
  </table>
</template>

<style>
  .result {
    cursor: pointer;
  }
  .result-icon {
    float: right;
  }
</style>

<script type="text/babel">
  export default{
    props: ['searchResults'],
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
