<template>
  <div id="app">
    <router-view/>
    <div :class="{ pyro: showPyro }">
      <div class="before"></div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      showPyro: false
    }
  },
  
  created() {
    EventBus.$on('rightAnswer', turnOnPyro)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
