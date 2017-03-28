<template lang='pug'>
.wrapper
  .point-selections
    point-selection(
      v-for='p in points'
      v-bind:key='p'
      v-bind:point='p'
      v-bind:selected='p === $props.point'
      v-on:click='(p) => $emit("select", p)'
    )
</template>

<script>
import PointSelection from './PointSelection.vue'

export default {
  name: 'PointSelections',
  components: {
    PointSelection
  },
  computed: {
    points: () => [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, 999, -1]
  },
  props: ['point']
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
}
.point-selections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 85%;
}
</style>