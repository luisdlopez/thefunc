<template>
  <div id="app">

    <!--Tabs for every opened project-->
    <project-tabs></project-tabs>

    <!--Folder selection screen, displayed for new projects only-->
    <select-folder v-if="newProject"></select-folder>

    <!--Views for active, scanned project-->
    <div class="project-container" v-if="activeProject.scanned">
      <!--Tabs for either function search or opened functions-->
      <view-tabs></view-tabs>

      <div class="views-container">
        <!--Search tab-->
        <directory-tree v-if="activeView === 0"></directory-tree>
        <preview-container
          v-if="activeView === 0 && activeProject.views[0].preview"
          :function-selected="activeProject.views[0].preview"></preview-container>

        <!--Function navigation page-->
        <function-navigation-page v-if="activeView > 0" :functions="activeViewFunctions"></function-navigation-page>
      </div>
    </div>

  </div>
</template>

<script  lang="babel">
  import ProjectTabsComponent from './project-tabs.vue';
  import ViewTabsComponent from './view-tabs.vue';
  import SelectFolderComponent from './folder-select/select-folder.vue';
  import previewContainer from './directory-tree/preview-container.vue';
  import FunctionNavigationComponent from './function-navigation-page/function-navigation-page.vue';
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
      'preview-container': previewContainer,
      'function-navigation-page': FunctionNavigationComponent
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

<style lang="scss">
$background-color: #000000;
$background-views-color: #181A1F;
$text-color: #F8F8F2;

#app {
  background-color: $background-color;
  color: $text-color;
  height: 100%;
  margin: 0;

  .project-container {
    height: calc(100% - 34.28px);

    .views-container {
      height: calc(100% - 34.28px);
      background-color: $background-views-color;
      padding: 5px;
    }
  }
}
</style>
