<template lang='pug'>
router-view
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$.view.title': (title) => {
      document.title = title;
    }
  }
}
</script>

<style>
* {
  font-family: 'Noto Sans Japanese', serif;
}
</style>