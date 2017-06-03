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
      .open(
        v-bind:class='{"ready": ready && !isOpen}'
      )
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
    v-bind:isConsensus='isConsensus'
    v-bind:max='room.max'
    v-bind:min='room.min'
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
  .result(
    v-if='isOpen && !isConsensus'
  )
    .min.flex
      .prefix
        .prefix_icon
          i.material-icons vertical_align_bottom
        | min
      .point
        | {{room.min === null ? '-' : room.min}}
      .point-suffix
        | pt
    .separator
      | /
    .max.flex
      .prefix
        .prefix_icon
          i.material-icons vertical_align_top
        | max
      .point
        | {{room.max === null ? '-' : room.max}}
      .point-suffix
        | pt
    .separator
      | /
    .average.flex
      .prefix
        | average
      .point
        | {{room.average === null ? '-' : room.average}}
      .point-suffix
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
    ready () {
      return this.players.find(p => p.point === null) ? false : true;
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

@keyframes AnimationName { 
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.open.ready button {
  background: linear-gradient(262deg, #dde657, #48ce59, #19d0d2, #1976d2);
  background-size: 1000% 1000%;
  animation: AnimationName 15s ease infinite;
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
  background-color: hsla(153, 80%, 65%, 0.75);
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
  background-color: hsla(153, 80%, 97%, 0.75);
}

.consensus .point-suffix {
  margin-left: 10px;
  font-size: 6rem;
  margin-top: 117px;
  margin-right: -100px;
}

.separator {
  opacity: 0.5;
  margin-left: 10px;
  margin-right: 10px;
}

.result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.02);
}

.flex {
  display: flex;
}

.prefix {
  display: flex;
}

.result .point {
  margin-left: 5px;
  font-weight: bold;
  margin-right: 2px;
}

.prefix_icon {
  position: relative;
  top: 3px;
}

.prefix_icon i {
  font-size: 1.25rem;
  opacity: 0.8;
}
 </style>