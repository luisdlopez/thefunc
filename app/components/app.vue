<template>
  <div id="app">

    <project-tabs :projects="projectNames" :active-index="activeIndex"></project-tabs>

    <select-folder v-if="!activeProject.path"></select-folder>

    <div class="project-container" v-if="activeProject.scanned">

      <view-tabs :views="views" :active-view="activeView"></view-tabs>

      <search-page v-if="activeView === 0" :active-project="activeProject"></search-page>
      <function-navigation-page v-if="activeView > 0" :functions="activeViewFunctions"></function-navigation-page>

    </div>

  </div>
</template>

<script type="text/babel">
  import ProjectTabsComponent from './project-tabs.vue';
  import ViewTabsComponent from './view-tabs.vue';
  import SelectFolderComponent from './folder-select/select-folder.vue';
  import SearchComponent from './function-search-page/function-search-page.vue';
  import FunctionNavigationComponent from './function-navigation-page/function-navigation-page.vue';
  import * as actions from '../vuex/actions';

  export default {
    vuex: {
      actions,
      getters: {
        activeIndex: state => state.activeProject,
        activeProject: state => state.projects[state.activeProject],
        projectNames: state => state.projects.map(project => project.path),
        views: state => state.projects[state.activeProject].views,
        activeView: state => state.projects[state.activeProject].activeView,
        activeViewFunctions: state => {
          let activeProject = state.projects[state.activeProject];
          return activeProject.views[activeProject.activeView].functions;
        }
      }
    },
    components: {
      'project-tabs': ProjectTabsComponent,
      'view-tabs': ViewTabsComponent,
      'select-folder': SelectFolderComponent,
      'search-page':SearchComponent,
      'function-navigation-page': FunctionNavigationComponent
    },
    events: {
      'folder-selected': function(path) {
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
      'close-project-tab': function(index) {
        this.closeProject(index);
      },
      'view-tab-clicked': function(index) {
        this.changeActiveView(index);
      },
      'close-view-tab': function(index) {
        this.closeViewTab(index);
      },
      'start-function-navigation': function(functionName, parsedFunctionIndex) {
        this.startFunctionNavigation(functionName, parsedFunctionIndex);
      },
      'open-function': function(options) {
        this.openFunction(options);
      }
    }
  };
</script>

<style>
  #app {
    height:100%;
    margin:0;
  }

  .project-container {
    height: calc(100% - 59px);
  }
</style>
