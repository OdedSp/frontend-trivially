<template>
  <div>
    <div v-if="!currUser && !gameStarted" class="buttons user-info">
      <button class="button is-success" @click="openLogin">Log In</button>
      <button class="button is-success" @click="openSignUp">Sign Up</button>
    </div>
    <div v-if="currUser && !gameStarted" class="status-bar">
      <div class="user">
        <p>Hello {{currUser.username}}</p>
      </div>
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
            <button class="button is-info btn-1" @click="startGame">
              Play<span v-if="!currUser">&nbsp;as Guest</span>
            </button>
          </div>
        </div>
      </section>
    </transition>

    <!-- <sign-up v-show="signUpShow" @closeComp="signUpShow=false" @createUser="createUser"></sign-up> -->
    <!-- <log-in v-show="loginShow" @closeComp="loginShow=false" @loginUser="loginUser"></log-in>   -->

    <!-- <results-page v-if="true" @playAgain="startGame" @review="showReview"></results-page>
    <report-page v-if="showReport"></report-page> -->
  </div>
</template>

<script>
import SignUp from './SignUp';
import LogIn from './LogIn';

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
    SignUp,
    LogIn
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
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
  margin: auto;
  margin: 10px;
}

.info-container{
  display: flex;
  flex-direction: column;
}

.buttons {
  margin: 10px
}

</style>
