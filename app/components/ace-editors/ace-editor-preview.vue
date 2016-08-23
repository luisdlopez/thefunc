<template>

  <div class="preview-editor" v-ace="functionSelected"></div>

</template>

<style>
  .preview-editor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<script>
  /*global ace:true*/
  /*eslint no-undef: "error"*/

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
          this.editor.setTheme('ace/theme/ambiance');
          this.editor.session.setMode('ace/mode/javascript');
        },

        update: function(func) {
          this.editor.setValue(func, -1);
        },

        unbind: function () {
          this.editor.destroy();
        }

      }
    }
  };
</script>
