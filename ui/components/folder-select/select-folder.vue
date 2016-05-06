<template>
  <div class="select-folder-container">

    <div class="ui black basic button file-upload">
      {{ folderName || 'Select Folder' }}
      <input v-el:dialog
            id="dialog"
            type="file"
            nwdirectory
            v-on:change="folderSelected"
            class="upload"/>
    </div>

    <button type="button"
          v-on:click="scan"
          :disabled="!path || scanStarted"
          class="ui black basic button scan-folder">

      <span v-if="!scanStarted">Scan</span>
      <span v-if="scanStarted">Scanning...</span>

    </button>

  </div>
</template>

<script>
export default {
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
    folderSelected: function(e) {
      e.preventDefault();
      this.path = e.target.files[0].path;
    },
    scan: function() {
      this.scanStarted = true;
      this.$dispatch('folder-selected', this.path);
    }
  }
}
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
