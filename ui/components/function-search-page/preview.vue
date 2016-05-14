<template>
  <div class="preview-container">

    <div class="preview-editor-container">
      <div class="preview-editor" v-ace="functionSelected"></div>
    </div>

  <div>
</template>

<script type="text/babel">
export default {
  props: ['functionSelected'],
  directives: {
    ace: {
      bind: function() {
        this.editor = ace.edit(this.el);
        this.editor.setOptions({
          maxLines: 100,
          readOnly: false,
          showGutter: true
        });
//        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");
      },
      update: function(value) {
        this.editor.setValue(value, -1);
      }
    }
  }
}
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

.preview-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
