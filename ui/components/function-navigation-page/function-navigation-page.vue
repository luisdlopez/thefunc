<template>
  <div class="function-navigation-page-container">

    <div class="view-container">

      <div class="column" v-for="(columnIndex, column) in functions" track-by="$index">

        <div class="view-editor-container"
              v-for="(funcIndex, func) in column" track-by="$index"
             v-bind:style="{ height: (func.content.split('\n').length * 16 + 32) + 'px' }">

          <div class="view-editor" v-ace="{ content: func.content, position: [columnIndex, funcIndex] }"></div>

        </div>

      </div>
      
    </div>

  </div>
</template>

<script type="text/babel">
import $ from 'jquery';

export default {
  props: ['functions'],
  vuex: {
    getters: {
      activeProject: state => state.projects[state.activeProject]
    }
  },
  methods: {
    openFunction: function(options) {
      this.$dispatch('open-function', options);
    }
  },
  directives: {

    ace: {

      bind: function() {
        let el = this.el;
        this.editor = ace.edit(el);
        this.editorPosition = null;
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
              .find('.ace_identifier,.ace_function').not('.ace_name')
              .toArray()
              .forEach(candidate => {
                candidate = $(candidate);
                let innerText = candidate[0].innerText;

                let activeProject = this.vm.activeProject;
                let parsedFunctions = activeProject.scan.functionNames;

                if (parsedFunctions.find(funcName => funcName.includes(innerText))) {

                  candidate.addClass('highlight-function-call');
                  candidate.on('click', event => {
                    // TODO: call service to retrieve functions with innertText name
                    // if only one found, simply open the new function
                    // if more than one, open some sort of menu to let
                    // user chose the function
                    this.vm.openFunction({ functionName: innerText, position: this.editorPosition});
                  });

                }

              });

          }
        });

        el.addEventListener('keyup', function(event) {
          $(el).find('.ace_identifier,.ace_function').not('.ace_name').removeClass('highlight-function-call');
        });

      },

      update: function(options) {
        this.editor.setValue(options.content, -1);
        this.editorPosition = options.position;
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
  color: orange !important;
  text-decoration: underline;
}
</style>
