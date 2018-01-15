<template>
  <div>
    <div v-if="!currUser && !gameStarted" class="buttons user-info">
      <button class="button is-white is-small is-outlined is-rounded" @click="openLogin">Log In</button>
      <!-- <button class="button is-info" @click="openSignUp">Sign Up</button> -->
    <user-count/>
    </div>
    <div v-if="currUser && !gameStarted" class="status-bar">
      <div class="user">
        <p>Hello {{currUser.username}}</p>
      </div>
    <user-count/>
    </div>
    <transition leave-active-class="animated zoomOut">
      <section class="game-start" v-if="!gameStarted">
        <section class="hero is-link is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                T<span>riv</span>Y<span>ou</span>
              </h1>
            </div>
          </div>
        </section>
        <div class="info-container">
          <div class="button-container">
            <button class="button is-success is-medium btn-1 is-rounded" @click="startGame">
              Play<span v-if="!currUser">&nbsp;as Guest</span>
            </button>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import UserCount from './UserCount';

import { mapGetters } from 'vuex'


export default {
  name: "HomePage",
  data() {
    return {
      signUpShow: false,
      loginShow: false,
      showQuest: false,
      gameStarted: false,
    };
  },
  computed: {
    ...mapGetters([
      'currUser'
    ]),
  },
  methods: {
    openSignUp() {
      this.$router.push('/signup')
    },
    openLogin() {
      this.$router.push('/login')
    },
    loginUser(userObj) {
      this.$store.dispatch("loginUser", userObj);
      this.loginShow = false;
    },
    startGame() {
      this.gameStarted = true
      setTimeout(_=> this.$router.push('game'), 500)
    }
  },
  components: {
    UserCount,
    // CometsCmp
  }
};
</script>

<style lang="scss" scoped>

@font-face {
 font-family: Julian;
 src: url('../assets/ARJULIAN.ttf')
}

h1 {
  font-weight: bold;
  font-family: Julian;
  font-size: 80px;
  span {
    color: black;
  }
}
.play-button{
  margin: 15px;
}
.button-container{
  height: 40vh;
  width: 60vw;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-1{
  margin-right: 1%;
}

.status-bar{
  margin: 10px;
}

.info-container{
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 0px 10px
}
</style>
