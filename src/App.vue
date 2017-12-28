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
import EventBus, {RIGHT_ANSWER} from './services/BusService'

export default {
  name: 'app',
  data() {
    return {
      showPyro: false
    }
  },
  methods: {
    turnOnPyro() {
      this.showPyro = true
      setTimeout(_=> this.showPyro = false, 2000)
    }
  },
  created() {
    EventBus.$on(RIGHT_ANSWER, this.turnOnPyro)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}

.pyro {
  position: absolute;
  top: 30vh;
  width: 100vw;
  // .before, .after {
  //   z-index: -1;
  // } 
}

button {
  cursor: pointer;
}
</style>
