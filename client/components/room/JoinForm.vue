<template lang='pug'>
.form
  v-text-field.input(
    name='name'
    v-model='name'
    label="YourName"
    single-line
  )
  v-btn.indigo--text(
    @click.native='join'
    outline
    dark
  )
    | JOIN
</template>

<script>
export default {
  name: 'JoinForm',
  data: () => ({
    name: ''
  }),
  methods: {
    join() {
      if (!this.name) return;
      this.$emit('join', this.name);
    }
  }
}
</script>

<style>
.input input {
  width: 60px;
}
</style>

<style scoped>
.form {
  width: 100%;
  display: flex;
}
.submit {
  width: 100px;
}
</style>