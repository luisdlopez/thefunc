<template>
  <div class="preview-container">

    <div class="preview-editor-container">
      <ace-preview :function-selected="functionSelected"></ace-preview>
    </div>

  </div>
</template>

<script type="text/babel">
  import acePreviewComponent from '../ace-editors/ace-editor-preview.vue';

  export default {
    props: ['functionSelected'],
    components: {
      'ace-preview': acePreviewComponent
    }
  };
</script>

<style>
  .preview-container {
    display: inline-block;
    vertical-align:top;
    width: 59%;
    height: 100%;
  }

  .preview-editor-container {
    position: relative;
    width: 100%;
  }
</style>
