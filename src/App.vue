<template>
  <div id="app">
    <comets-cmp/>
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
import CometsCmp from './components/CometsCmp';

import EventBus, { RIGHT_ANSWER, GAME_WON } from './services/BusService'

export default {
  name: 'app',
  data() {
    return {
      showNav: false,
      showPyro: false
    }
  },
  methods: {
    turnOnPyro(delay) {
      this.showPyro = true
      setTimeout(_=> this.showPyro = false, delay)
    }
  },
  watch: {
     $route(to, from) {
      to.name === 'HomePage'
      ? this.showNav = false : this.showNav = true
    }
  },
  components: {
    navBar,
    CometsCmp
  },
  created() {
    if (this.$route.name !== 'HomePage') this.showNav = true
    EventBus.$on(RIGHT_ANSWER, _=> this.turnOnPyro(2000))
    EventBus.$on(GAME_WON, _=> this.turnOnPyro(6010))
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
