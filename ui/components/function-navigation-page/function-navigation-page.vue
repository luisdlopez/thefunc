<template>
  <div class="function-navigation-page-container">

    <div class="view-container">

      <div class="column" v-for="column in functions" track-by="$index">

        <div class="view-editor-container"
              v-for="func in column" track-by="$index"
             v-bind:style="{ height: (func.lines * 16 + 48) + 'px', marginBottom: '32px' }">

          <div class="view-editor" v-ace="func.content"></div>

        </div>

      </div>
      
    </div>

  </div>
</template>

<script type="text/babel">
import $ from 'jquery';

export default {
  props: ['functions'],
  methods: {
    openFunction: function() {
      this.$dispatch('open-function');
    }
  },
  directives: {
    ace: {

      bind: function() {
        let el = this.el;
        this.editor = ace.edit(el);
        this.editor.setOptions({
          maxLines: 100,
          readOnly: false,
          showGutter: true
        });
//        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");

        this.el.addEventListener('keydown', event => {
          let COMMAND_KEY_CODE = 91;
          let CTRL_KEY_CODE = 17;

          if (event.which === COMMAND_KEY_CODE || event.which === CTRL_KEY_CODE) {
            $(el)
              .find('.ace_identifier')
              .toArray()
              .forEach(candidate => {
                candidate = $(candidate);
                // TODO: add css class and click event handler is
                // text is found in our parsed functions
                candidate.addClass('highlight-function-call');
                candidate.on('click', event => {
                  this.vm.openFunction();
                });
              });
          }
        });

        el.addEventListener('keyup', function(event) {
          $(el).find('.ace_identifier').removeClass('highlight-function-call');
        });

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
  border: 1px solid black;
  height: calc(100% - 49px);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.view-container {
  border: 1px solid red;
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

.view-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.highlight-function-call {
  pointer-events: auto;
  cursor: pointer;
  color: orange;
  text-decoration: underline;
}
</style>
