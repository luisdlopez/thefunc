<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="path in projects"
          track-by="$index"
          :class="{ 'active': activeIndex === $index }"
          @click.stop.prevent="changeActiveProject($index)">

      <div>
        {{ path.split('/').pop()  || 'New Project' }}
      </div>

      <i v-if="$index > 0"
            class="remove icon close-project-icon"
            @click="closeProject($index)"></i>

    </a>

    <a class="item open-new-project"
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

<style lang="scss" scoped>
$text-active-color: #F8F8F2;
$background-active-tab: #181A1F;
$text-inactive-color: #616772;
$active-tab-border-color: #528BFF;

.ui.secondary.pointing.menu {
  margin-bottom: 0px;

  .item {
    color: $text-inactive-color;
    border-bottom: none;

    &:hover {
      color: $text-inactive-color !important;
    }
  }

  .active.item {
    color: $text-active-color;
    background-color: $background-active-tab;
    border-bottom: none;
    border-left: 2px solid;
    border-color: $active-tab-border-color;

    &:hover {
      color: $text-active-color !important;
      background-color: $background-active-tab;
      border-color: $active-tab-border-color;
    }
  }

  .close-project-icon {
    float: right;
    margin-left: 15px;
  }

  .open-new-project {
    color: $text-active-color;
    margin-bottom: -3px;

    &:hover {
      color: $text-active-color !important;
    }
  }
}
</style>
