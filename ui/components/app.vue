<template>
  <div id="app">

    <project-tabs :projects="projectNames" :active-index="activeIndex"></project-tabs>
    <select-folder v-if="!activeProject.path"></select-folder>
    <search-page v-if="activeProject.scanned" :active-project="activeProject"></search-page>

  </div>
</template>

<script>
import ProjectTabsComponent from './project-tabs.vue';
import SelectFolderComponent from './folder-select/select-folder.vue';
import searchPageComponent from './search-page/index.vue';
import * as actions from '../vuex/actions';

export default {
  vuex: {
    actions,
    getters: {
      activeIndex: state => state.activeProject,
      activeProject: state => state.projects[state.activeProject],
      projectNames: state => state.projects.map(project => project.path)
    }
  },
  components: {
    'project-tabs': ProjectTabsComponent,
    'select-folder': SelectFolderComponent,
    'search-page': searchPageComponent
  },
  events: {
    'folder-selected': function (path) {
      this.scanFolder(path);
    },
    'search-updated': function(search) {
      this.searchFunction(search);
    },
    'search-result-clicked': function(index) {
      this.showPreview(index);
    },
    'project-tab-clicked': function(index) {
      this.changeActiveProject(index);
    },
    'add-new-project': function() {
      this.openNewProject();
    }
  }
}

</script>

<style>
#app {
  height:100%;
  margin:0;
}
</style>
