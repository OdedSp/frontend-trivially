<template>
  <div id="app">
    <transition enter-active-class="animated slideInDown">
      <nav-bar v-if="showNav" />
    </transition>

    <transition>
      <router-view />
    </transition>

    <div :class="{ pyro: showPyro }">
      <div class="before"></div>
      <div class="after"></div>
    </div>
  </div>
</template>

<script>
import navBar from './components/NavBar'

import EventBus, {RIGHT_ANSWER} from './services/BusService'

export default {
  name: 'app',
  data() {
    return {
      showNav: false,
      showPyro: false
    }
  },
  methods: {
    turnOnPyro() {
      this.showPyro = true
      setTimeout(_=> this.showPyro = false, 2000)
    }
  },
  watch: {
     $route(to, from) {
      console.log({to, from})
      to.name === 'HomePage'
      ? this.showNav = false : this.showNav = true
    }
  },
  components: {
    navBar
  },
  created() {
    if (this.$route.name !== 'HomePage') this.showNav = true
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

.navbar-my-style {
  margin-bottom: 10px;
  img {
    width: auto;
    height: auto;
  }
}

button {
  cursor: pointer;
}
</style>
