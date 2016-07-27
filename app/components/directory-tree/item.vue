<template>
  <li class="item">

    <button v-if="isFolder" @click.stop.prevent="toggleFolder(model.path)" class="clean-button">
      <i v-if="!model.opened" class="fa fa-folder-o" aria-hidden="true">&nbsp;</i>
      <i v-if="model.opened" class="fa fa-folder-open-o" aria-hidden="true">&nbsp;</i>
      {{ model.name }} &nbsp;
    </button>

    <button v-if="!isFolder" @click.stop.prevent="toggleFile(model.path)" class="clean-button">
      <i class="fa fa-file-code-o" aria-hidden="true">&nbsp;</i>
      {{ model.name }} &nbsp;
      <i v-if="parsed" class="fa fa-check-square-o parsed" aria-hidden="true"></i>
      <i v-if="parsing" class="fa fa-spinner fa-spin parsing" aria-hidden="true"></i>
      <i v-if="parsingError" class="fa fa-exclamation-circle parsing-error" aria-hidden="true"></i>
      <i v-if="notParsed" class="fa fa-square-o not-parsed" aria-hidden="true"></i>
    </button>

    <ul v-if="isFolder && model.opened">
      <item v-for="model in model.children"
        :model="model">
      </item>
    </ul>

    <ul v-if="!isFolder && model.opened">
      <div v-for="func in model.functions" @click.stop.prevent="showPreview(func.content)">
        <i class="fa fa-code" aria-hidden="true"></i>
        &nbsp;
        {{ func.name }}
      </div>
    </ul>

  </li>
</template>

<script type="text/babel">
  import { toggleFolder, toggleFile, showPreview } from '../../vuex/actions';
  const FILE_STATE = require('../../services/parsers/file.state.enum');

  export default {
    name: 'item',
    props: {
      model: Object
    },
    vuex: {
      actions: {
        toggleFolder,
        toggleFile,
        showPreview
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
          this.model.children.length;
      },
      notParsed: function() {
        return this.model.parsed === FILE_STATE.NOT_PARSED;
      },
      parsing: function() {
        return this.model.parsed === FILE_STATE.PARSING;
      },
      parsingError: function() {
        return this.model.parsed === FILE_STATE.PARSING_ERROR;
      },
      parsed: function() {
        return this.model.parsed === FILE_STATE.PARSED;
      }
    }
  };
</script>

<style>
  .directory-tree-container .item {
    cursor: pointer;
    list-style-type: none;
  }
  .clean-button {
    background:none;
    border:none;
    outline: none;
  }
  .fa.fa-folder-o {
    color: sandybrown;
  }
  .fa.fa-folder-open-o {
    color: sandybrown;
  }
  .not-parsed {
    color: #CCCCCC;
  }
  .parsing {
    color: #CCCCCC;
  }
  .parsed {
    color: #00c800;
  }
  .parsing-error {
    color: orange;
  }
</style>
