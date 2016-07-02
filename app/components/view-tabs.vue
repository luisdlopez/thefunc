<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="view in views"
          track-by="$index"
          :class="{ 'active': activeView === $index }">

      <div @click.stop.prevent="changeActiveView($index)">
        {{ view.title }}
      </div>

      <i v-if="$index > 0"
            class="remove icon close-view-icon"
            @click="closeViewTab($index)"></i>

    </a>

  </div>
</template>

<script lang="babel">
  import {
    changeActiveView,
    closeViewTab
  } from '../vuex/actions';

  export default {
    vuex: {
      actions: {
        changeActiveView,
        closeViewTab
      },
      getters: {
        views: state => state.projects[state.activeProject].views,
        activeView: state => state.projects[state.activeProject].activeView
      }
    }
  };
</script>

<style>
  .close-view-icon {
    float: right;
    margin-left: 15px !important;
  }
</style>
