<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="view in views"
          track-by="$index"
          v-bind:class="{ 'active': activeView === $index }">

      <div v-on:click.stop.prevent="tabClicked($index)">
        {{ view.title }}
      </div>

      <i v-if="$index > 0"
            class="remove icon close-view-icon"
            v-on:click="closeTab($index)"></i>

    </a>

  </div>
</template>

<script>
export default {
  props: ['views', 'activeView'],
  methods: {
    tabClicked: function (index) {
      this.$dispatch('view-tab-clicked', index);
    },
    closeTab: function(index) {
      this.$dispatch('close-view-tab', index);
    }
  }
}
</script>

<style>
.close-view-icon {
  float: right;
  margin-left: 15px !important;
}
</style>
