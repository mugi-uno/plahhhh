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

  .consensus(
    v-if='isOpen && isConsensus'
  )
    .text
      | CONSENSUS
    .point
      | {{room.average}}
      span.point-suffix
        | pt
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
    },
    isConsensus() {
      return this.$props.room.result === 'consensus';
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

.consensus {
  position: absolute;
  top: 240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.consensus .text {
  background-color: hsla(20, 80%, 65%, 0.75);
  color: white;
  display: flex;
  font-size: 6rem;
  font-weight: bold;
  height: 110px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.consensus .point {
  justify-content: center;
  width: 100%;
  display: flex;
  font-size: 20rem;
  font-weight: bold;
  align-items: center;
  height: 280px;
  background-color: hsla(20, 80%, 95%, 0.75);
}

.consensus .point-suffix {
  margin-left: 10px;
  font-size: 6rem;
  margin-top: 117px;
  margin-right: -100px;
}
 </style>