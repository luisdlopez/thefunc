<template>
  <div class="select-folder-container">

    <button type="button"
            class="ui black basic button scan-folder"
            @click="folderSelected">
      {{ folderName || 'Select Folder' }}
    </button>

    <button type="button"
        @click="scan"
        :disabled="!path || scanning"
        class="ui black basic button scan-folder">

    <span v-if="!scanning">Scan</span>
    <span v-if="scanning">Scanning...</span>

    </button>

  </div>
</template>

<script lang="babel">
  const { dialog } = require('electron').remote;
  import { buildDirectoryTree } from '../../vuex/actions';

  export default {
    vuex: {
      actions: {
        buildDirectoryTree
      }
    },
    data() {
      return {
        path: '',
        scanning: false
      };
    },
    computed: {
      folderName: function() {
        let pathSplit = this.path.split('/');
        return pathSplit.pop();
      }
    },
    methods: {
      scan: function() {
        this.scanning = true;
        setTimeout(() => {
          this.buildDirectoryTree(this.path);
        }, 100);
      },
      folderSelected: function() {
        const selectedFolder = dialog.showOpenDialog({properties: ['openDirectory']});
        if (selectedFolder && selectedFolder.length && !!selectedFolder[0]) {
          this.path = selectedFolder[0];
        }
      }
    }
  };
</script>

<style lang="scss">
$background-color: #181A1F;
$text-color: #F8F8F2;

.select-folder-container {
  background-color: $background-color;
  height: calc(100% - 40px);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  .ui.basic.black.button {
    color: $text-color !important;
    box-shadow: 0px 0px 0px 1px $text-color inset !important;
  }

  .file-upload,
  .scan-folder {
    position: relative;
    width: 25%;
    margin-bottom: 1rem !important;
  }

  .file-upload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
</style>
