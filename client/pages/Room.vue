<template lang='pug'>
.root
  v-toolbar.nav
    v-toolbar-title
      span.navlabel room:
      | {{name}}
  .row
    .join(v-if='!joining')
      join-form(@join='join')
  .room(v-if='joining')
    game(
      :room='room'
      @start='$store.dispatch("room/start")'
      @open='$store.dispatch("room/open")'
      @pointSelect='pointSelect'
    )
</template>

<script>
import { mapState } from 'vuex';
import Game from '../components/room/Game.vue'
import JoinForm from '../components/room/JoinForm.vue'

export default {
  name: 'Room',
  components: {
    Game,
    JoinForm,
  },
  computed: {
    room() {
      return this.$store.state.room;
    },
    ...mapState('room', ['name', 'joining'])
  },
  methods: {
    join (name) {
      this.$store.dispatch('room/join', { name });
    },
    pointSelect (point) {
      this.$store.dispatch('room/pointSelect', { point });
    }
  },
  created() {
    this.$store.dispatch('room/fetch', { room: this.$store.state.route.params.room })
  },
}
</script>

<style scoped>
.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.nav {
  margin-bottom: 30px;
}
.navlabel {
  font-size: 14px;
  margin-right: 5px;
}
.row {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}
.join {
  width: 500px;
}
</style>