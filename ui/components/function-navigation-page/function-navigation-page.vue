<template>
  <div class="function-navigation-page-container">

    <div class="view-container">

      <div class="column" v-for="(columnIndex, column) in functions" track-by="$index">

        <div class="view-editor-container"
              v-for="(funcIndex, func) in column" track-by="$index"
              v-bind:style="{ height: (func.content.split('\n').length * 16 + 32) + 'px' }">

          <ace-navigation :func="func" :position="[columnIndex, funcIndex]"></ace-navigation>

        </div>

      </div>
      
    </div>

  </div>
</template>

<script type="text/babel">
  import aceNavigationComponent from '../ace-editors/ace-editor-navigation.vue';

  export default {
    props: ['functions'],
    components: {
      'ace-navigation': aceNavigationComponent
    }
  };
</script>

<style>
  .function-navigation-page-container {
    height: calc(100% - 49px);
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .view-container {
    white-space: nowrap;
    height: 100%;
  }

  .column {
    overflow-y: auto;
    height: inherit;
    min-width: 560px;
    display: inline-block;
    vertical-align: top;
    padding: 5px;
  }

  .view-editor-container {
    display: block;
    position: relative;
  }

  .highlight-function-call {
    pointer-events: auto;
    cursor: pointer;
    color: orange !important;
    text-decoration: underline;
  }
</style>
