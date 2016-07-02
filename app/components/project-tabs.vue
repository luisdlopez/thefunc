<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="path in projects"
          track-by="$index"
          :class="{ 'active': activeIndex === $index }">

      <div @click.stop.prevent="changeActiveProject($index)">
        {{ path.split('/').pop()  || 'New Project' }}
      </div>

      <i v-if="$index > 0"
            class="remove icon close-project-icon"
            @click="closeProject($index)"></i>

    </a>

    <a class="item"
          @click.stop.prevent="openNewProject()">
      <i class="plus square outline icon"></i>
    </a>

  </div>
</template>

<script lang="babel">
  import {
    changeActiveProject,
    openNewProject,
    closeProject
  } from '../vuex/actions';

  export default {
    vuex: {
      actions: {
        changeActiveProject,
        openNewProject,
        closeProject
      },
      getters: {
        activeIndex: state => state.activeProject,
        projects: state => state.projects.map(project => project.path)
      }
    }
  };
</script>

<style>
  .close-project-icon {
    float: right;
    margin-left: 15px !important;
  }
</style>
