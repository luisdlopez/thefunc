<template>
  <div class="ui top attached tabular menu">

    <a class="item"
          v-for="path in projects"
          track-by="$index"
          v-bind:class="{ 'active': activeIndex === $index }"
          v-on:click.stop.prevent="tabClicked($index)">

      {{ path.split('/').pop()  || 'New Project' }}

    </a>

    <a class="item"
          v-on:click.stop.prevent="addNewProject()">

          +
    </a>

  </div>
</template>

<script>
export default {
  props: ['projects', 'activeIndex'],
  methods: {
    tabClicked: function (index) {
      this.$dispatch('project-tab-clicked', index);
    },
    addNewProject: function() {
      this.$dispatch('add-new-project');
    }
  }
}
</script>
