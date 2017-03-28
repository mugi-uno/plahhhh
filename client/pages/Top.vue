<template lang='pug'>
.container.topViewContainer
  .input
    v-text-field(
      name='room'
      single-line
      v-model='room'
    )
  v-btn.submit.indigo--text(
    outline
    @click.native='roomin'
  )
    | START A PLANNING
    i.material-icons.nextArrow navigate_next
</template>

<script>
export default {
  name: 'Top',
  data () {
    return {
      room: ''
    }
  },
  methods: {
    roomin () {
      this.$store.dispatch('room/in', this.$data.room);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.input {
  width: 90%;
}
.submit {
  font-size: 2rem;
  line-height: 2rem;
  height: 4.0rem;
}
.nextArrow {
  font-size: 3rem;
  margin-top: 5px;
  margin-right: -15px;
  line-height: inherit;
}
</style>

<style>
.topViewContainer .input input {
  text-align: center;
  font-size: 4rem;
  height: 6.5rem;
}
</style>