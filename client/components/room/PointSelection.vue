<template lang='pug'>
.point-selection
  v-btn(
    v-bind:class='{"indigo--text": !$props.selected}'
    v-bind:outline='!$props.selected'
    v-bind:primary='$props.selected'
    v-bind:dark='$props.selected'
    @click.native='$emit("click", selected ? null : $props.point)'
  )
    | {{pointLabel}}
</template>

<script>
export default {
  name: 'PointSelection',
  props: ['point', 'selected'],
  computed: {
    pointLabel() {
      if (this.$props.point === -1) return '?';
      if (this.$props.point === 999) return '∞';
      return this.$props.point;
    }
  }
}
</script>

<style scoped>
.point-selection button {
  min-width: 50px;
  width: 50px;
}
.point-selection.selected {
  font-weight: bold;
}
</style>