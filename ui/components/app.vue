<template>
  <div id="app">

    <project-tabs :projects="projectNames" :active-index="activeIndex"></project-tabs>
    <select-folder v-if="!activeProject.path"></select-folder>

    <div v-if="activeProject.scanned">

      <view-tabs :views="views" :active-view="activeView"></view-tabs>
      <search-page v-if="activeView === 0" :active-project="activeProject"></search-page>

    </div>

  </div>
</template>

<script>
import ProjectTabsComponent from './project-tabs.vue';
import ViewTabsComponent from './view-tabs.vue';
import SelectFolderComponent from './folder-select/select-folder.vue';
import searchPageComponent from './search-page/index.vue';
import * as actions from '../vuex/actions';

export default {
  vuex: {
    actions,
    getters: {
      activeIndex: state => state.activeProject,
      activeProject: state => state.projects[state.activeProject],
      projectNames: state => state.projects.map(project => project.path),
      views: state => state.projects[state.activeProject].views,
      activeView: state => state.projects[state.activeProject].activeView
    }
  },
  components: {
    'project-tabs': ProjectTabsComponent,
    'view-tabs': ViewTabsComponent,
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
    'search-result-clicked': function(resultIndex, parsedFunctionIndex) {
      this.showPreview(resultIndex, parsedFunctionIndex);
    },
    'project-tab-clicked': function(index) {
      this.changeActiveProject(index);
    },
    'add-new-project': function() {
      this.openNewProject();
    },
    'view-tab-clicked': function(index) {
      console.log('view-tab-clicked clicked!', index);
    },
    'start-function-navigation': function(functionName, parsedFunctionIndex) {
      this.startFunctionNavigation(functionName, parsedFunctionIndex);
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
