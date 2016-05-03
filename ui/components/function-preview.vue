<template>
  <div class="function-preview-container">

    <div class="editor-container">
      <div class="editor" v-ace="functionSelected"></div>
    </div>

  <div>
</template>

<script>
export default {
  props: ['functionSelected'],
  directives: {
    ace: {
      bind: function() {
        this.editor = ace.edit(this.el);
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");
      },
      update: function(value) {
        this.editor.setValue(value.content);
      }
    }
  }
}
</script>

<style>
.function-preview-container {
  display: inline-block;
  vertical-align:top;
  width: 60%;
  height: calc(100% - 68px);
}

.editor-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.editor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>
