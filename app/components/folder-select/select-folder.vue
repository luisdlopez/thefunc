<template>
  <div class="select-folder-container">

    <button type="button"
            class="ui black basic button scan-folder"
            @click="folderSelected">
      {{ folderName || 'Select Folder' }}
    </button>

    <button type="button"
        @click="scan"
        :disabled="!path || scanStarted"
        class="ui black basic button scan-folder">

    <span v-if="!scanStarted">Scan</span>
    <span v-if="scanStarted">Scanning...</span>

    </button>

  </div>
</template>

<script lang="babel">
  const { dialog } = require('electron').remote;
  import { scanFolder } from '../../vuex/actions';

  export default {
    vuex: {
      actions: {
        scanFolder
      }
    },
    data() {
      return {
        path: '',
        scanStarted: false
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
        this.scanStarted = true;
        this.scanFolder(this.path);
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

<style>
  .select-folder-container {
    height: calc(100% - 49px);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
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
</style>
