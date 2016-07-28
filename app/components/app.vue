<template>
  <div id="app">

    <!--Tabs for every opened project-->
    <project-tabs></project-tabs>

    <!--Folder selection screen, displayed for new projects only-->
    <select-folder v-if="newProject"></select-folder>

    <!--Views for active, scanned project-->
    <div class="project-container" v-if="activeProject.scanned">
      <view-tabs></view-tabs>
      <directory-tree></directory-tree>
      <preview-container
        v-if="activeProject.views[0].preview"
        :function-selected="activeProject.views[0].preview"></preview-container>
      <!--<search-page v-if="activeView === 0" :active-project="activeProject"></search-page>-->
      <!--<function-navigation-page v-if="activeView > 0" :functions="activeViewFunctions"></function-navigation-page>-->
    </div>

  </div>
</template>

<script  lang="babel">
  import ProjectTabsComponent from './project-tabs.vue';
  import ViewTabsComponent from './view-tabs.vue';
  import SelectFolderComponent from './folder-select/select-folder.vue';
  import previewContainer from './directory-tree/preview-container.vue';
  // TODO: look at these 2 components, possibly replace them
  // import SearchComponent from './function-search-page/function-search-page.vue';
  // import FunctionNavigationComponent from './function-navigation-page/function-navigation-page.vue';
  import directoryTreeComponent from './directory-tree/directory-tree.vue';
  import * as actions from '../vuex/actions';

  export default {
    vuex: {
      actions,
      getters: {
        activeIndex: state => state.activeProject,
        activeProject: state => state.projects[state.activeProject],
        newProject: state => !state.projects[state.activeProject].path,
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
      'select-folder': SelectFolderComponent,
      'view-tabs': ViewTabsComponent,
      'directory-tree': directoryTreeComponent,
      'preview-container': previewContainer
      // 'search-page': SearchComponent,
      // 'function-navigation-page': FunctionNavigationComponent
    },
    events: {
      'search-updated': function(search) {
        this.searchFunction(search);
      },
      'search-result-clicked': function(resultIndex, parsedFunctionIndex) {
        this.showPreview(resultIndex, parsedFunctionIndex);
      },
      'start-function-navigation': function(parsedFunctionIndex) {
        this.startFunctionNavigation(parsedFunctionIndex);
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
    height: calc(100% - 63px);
  }
</style>
