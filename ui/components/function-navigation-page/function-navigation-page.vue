<template>
  <div class="function-navigation-page-container">

    <div class="view-editor-container" v-for="func in functions">
      <div class="vide-editor" v-ace="func"></div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['functions'],
  directives: {
    ace: {
      bind: function() {
        this.editor = ace.edit(this.el);
        this.editor.setOptions({
          maxLines: 100,
          readOnly: false,
          showGutter: true
        });
        this.editor.setTheme("ace/theme/monokai");
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
.function-navigation-page-container {
  height: calc(100% - 49px);
  width: 100%;
}

.view-editor-container {
  position: relative;
  width: 625px;
}

.view-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
