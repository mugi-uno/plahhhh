<template lang='pug'>
.players
  player(
    v-for='player in players'
    v-bind:id='player.id'
    v-bind:name='player.name'
    v-bind:isMyself='player.isMyself'
    v-bind:isOpen='$props.isOpen'
    v-bind:isConsensus='$props.isConsensus'
    v-bind:min='$props.min'
    v-bind:max='$props.max'
    v-bind:point='player.point'
    v-bind:key='player.id'
  )
</template>

<script>
import Player from './Player.vue'

export default {
  name: 'Players',
  components: {
    Player,
  },
  props: ['players', 'isOpen', 'isConsensus', 'max', 'min']
}
</script>

<style scoped>
.players {
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
}
</style>