<template>

  <div class="preview-editor"
       v-ace="{ content: func.content, position: position }"></div>

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

<script type="text/babel">
  /*global ace:true*/
  /*eslint no-undef: "error"*/

  import $ from 'jquery';

  let keyDownListener = function(event) {
    let COMMAND_KEY_CODE = 91;
    let CTRL_KEY_CODE = 17;

    if (event.which === COMMAND_KEY_CODE || event.which === CTRL_KEY_CODE) {

      $(this.el)
        .find('.ace_identifier,.ace_function').not('.ace_name')
        .toArray()
        .forEach(candidate => {
          candidate = $(candidate);
          const innerText = candidate[0].innerText;
          const parsedFunctions = this.vm.activeProject.scan.functionNames;

          if (parsedFunctions.find(funcName => funcName.includes(innerText))) {

            candidate.addClass('highlight-function-call');
            candidate.on('click', () => {
              // TODO: call service to retrieve functions with innertText name
              // if only one found, simply open the new function
              // if more than one, open some sort of menu to let
              // user chose the function
              this.vm.openFunction({ functionName: innerText, position: this.editorPosition});
            });

          }

        });

    }
  };

  let keyUpListener = function() {
    $(this.el)
      .find('.ace_identifier,.ace_function')
      .not('.ace_name')
      .removeClass('highlight-function-call')
      .unbind('click');
  };

  export default {
    props: ['func', 'position'],
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

          this.editor = ace.edit(this.el);
          this.editorPosition = null;
          this.editor.setOptions({
            maxLines: 100,
            readOnly: false,
            showGutter: true
          });
          // this.editor.setTheme('ace/theme/monokai');
          this.editor.session.setMode('ace/mode/javascript');

          this.el.addEventListener('keydown', keyDownListener.bind(this));
          this.el.addEventListener('keyup', keyUpListener.bind(this));

        },

        update: function(options) {
          this.editor.setValue(options.content, -1);
          this.editorPosition = options.position;
        },

        unbind: function () {
          this.editor.destroy();
        }

      }

    }
  };
</script>