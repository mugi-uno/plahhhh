<template lang='pug'>
.game
  .playButton
    .buttons
      .start
        v-btn.primary(
          dark round
          @click.native='$emit("start")'
        )
          | CLEAR
      .open
        v-btn.primary(
          dark round
          @click.native='$emit("open")'
        )
          | OPEN

  point-selections(
    v-bind:point='room.myself.point'
    v-on:select='pointSelect'
  )

  players(
    v-bind:players='players'
    v-bind:isOpen='isOpen'
  )
</template>

<script>
import PointSelections from './PointSelections.vue'
import Players from './Players.vue'

export default {
  name: 'Game',
  components: {
    PointSelections,
    Players,
  },
  props: ['room'],
  computed: {
    players () {
      // 自分→その他のユーザの順にならべる
      // TODO : storeでやれ
      const room = this.$props.room;
      const players = room.players;
      const myself = players.find(p => p.id === room.myself.id);
      const others = players.filter(p => p.id !== room.myself.id);
      return [Object.assign({isMyself: true}, myself), ...others];
    },
    isOpen () {
      return this.$props.room.status === "open";
    } 
  },
  methods: {
    pointSelect (point) {
      this.$emit('pointSelect', point);
    }
  }
}
</script>

<style scoped>
.playButton {
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.buttons {
  width: 500px;
  display: flex;
  justify-content: space-around;
}

.playButton button {
  width: 200px;
}
</style>