<template>
  <div class="ui pointing secondary menu">

    <a class="item"
          v-for="path in projects"
          track-by="$index"
          v-bind:class="{ 'active': activeIndex === $index }">

      <div v-on:click.stop.prevent="tabClicked($index)">
        {{ path.split('/').pop()  || 'New Project' }}
      </div>

      <i v-if="$index > 0"
            class="remove icon close-project-icon"
            v-on:click="closeTab($index)"></i>

    </a>

    <a class="item"
          v-on:click.stop.prevent="addNewProject()">
      <i class="plus square outline icon"></i>
    </a>

  </div>
</template>

<script type="text/babel">
  export default {
    props: ['projects', 'activeIndex'],
    methods: {
      tabClicked: function (index) {
        this.$dispatch('project-tab-clicked', index);
      },
      addNewProject: function() {
        this.$dispatch('add-new-project');
      },
      closeTab: function(index) {
        this.$dispatch('close-project-tab', index);
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
