<template>
  <div class="function-navigation-page-container">

    <div class="ui special popup">
      <div class="header">Custom Header</div>
      <div class="ui button">Click Me</div>
    </div>

    <div class="view-container">

      <div class="column" v-for="(columnIndex, column) in functions" track-by="$index">

        <div class="view-editor-container"
              v-for="(funcIndex, func) in column" track-by="$index"
              v-bind:style="{ height: (func.content.split('\n').length * 14 + 1) + 'px' }">

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

<style lang="scss" scoped>
$background-color: #181A1F;

.function-navigation-page-container {
  background-color: $background-color;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  .view-container {
    white-space: nowrap;
    height: 100%;
  }

  .column {
    overflow-y: auto;
    height: inherit;
    min-width: 620px;
    display: inline-block;
    vertical-align: top;
    padding: 0 5px;
  }

  .view-editor-container {
    display: block;
    position: relative;
    margin-bottom: 20px;
  }
}
</style>
