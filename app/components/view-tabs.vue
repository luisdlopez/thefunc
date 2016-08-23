<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="view in views"
          track-by="$index"
          :class="{ 'active': activeView === $index }"
          @click.stop.prevent="changeActiveView($index)">

      <div>
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

<style lang="scss" scoped>
$text-active-color: #F8F8F2;
$background-active-tab: #181A1F;
$text-inactive-color: #616772;
$active-tab-border-color: #9AD626;

.ui.secondary.pointing.menu {
  margin-bottom: 0px;
  margin-top: -2px;

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
    border-bottom: 2px solid none;
    border-left: 2px solid;
    border-color: $active-tab-border-color;

    &:hover {
      color: $text-active-color !important;
      background-color: $background-active-tab;
      border-color: $active-tab-border-color;
    }
  }

  .close-view-icon {
    float: right;
    margin-left: 15px !important;
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
