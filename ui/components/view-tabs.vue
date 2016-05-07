<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="view in views"
          track-by="$index"
          v-bind:class="{ 'active': activeView === $index }"
          v-on:click.stop.prevent="tabClicked($index)">

      {{ view.title }}

    </a>

  </div>
</template>

<script>
export default {
  props: ['views', 'activeView'],
  methods: {
    tabClicked: function (index) {
      this.$dispatch('view-tab-clicked', index);
    }
  }
}
</script>
