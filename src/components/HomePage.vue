<template>
  <div>
    <transition leave-active-class="animated zoomOut">
      <div v-if="!currUser && !gameIsStarting" class="buttons user-info">
        <button class="button is-info" @click="openLogin">Log In</button>
        <button class="button is-info" @click="openSignUp">Sign Up</button>
      </div>
      <div v-else-if="!gameIsStarting" class="status-bar user-info">
        <div class="user">
          <p>Hello {{currUser.name}}</p>
          <!-- <p v-if="quest">pnts</p> -->
        </div>
        <!-- <div v-if="quest" class="opponent">
          <p>opponent name</p> -->
          <!-- <p>{{timeLeft}}</p> -->
          <!-- <p>pnts</p>
        </div> -->
      </div>
    </transition>
    <transition leave-active-class="animated zoomOut">
      <!-- <section class="game-start" v-if="!quest"> -->
      <section class="game-start" v-if="!gameIsStarting">
        <section class="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                trivial travesty!
              </h1>
              <h2 class="subtitle">
                A titillating trivia tournament that'll turn timid twits to talented thinkers!
              </h2>
            </div>
          </div>
        </section>
        <button class="button is-success play-button" @click="startGame">
          Play<span v-if="!currUser">&nbsp;as Guest</span>
        </button>
      </section>
    </transition>

    <sign-up v-show="signUpShow" @closeComp="signUpShow=false" @createUser="createUser"></sign-up>
    <log-in v-show="loginShow" @closeComp="loginShow=false" @loginUser="loginUser"></log-in>  

    <!-- <results-page v-if="true" @playAgain="startGame" @review="showReview"></results-page>
    <report-page v-if="showReport"></report-page> -->
  </div>
</template>

<script>
import SignUp from './SignUp';
import LogIn from './LogIn';
// import ReportPage from "./ReportPage"; // use router to view instead
// import ResultsPage from "./ResultsPage"; // use router to view instead

import { mapGetters } from 'vuex'
// import { ADD_REPORT } from "../modules/gameReport.module"; // temporarily here


export default {
  name: "HomePage",
  data() {
    return {
      signUpShow: false,
      loginShow: false,
      showQuest: false,
      gameIsStarting: false,
      showReport: false // temp
    };
  },
  computed: {
    ...mapGetters([
      'currUser'
    ]),
  },
  methods: {
    openSignUp() {
      this.signUpShow = !this.signUpShow;
      if (this.loginShow) {
        this.loginShow = false;
      }
    },
    openLogin() {
      this.loginShow = !this.loginShow;
      if (this.signUpShow) {
        this.signUpShow = false;
      }
    },
    createUser(userObj) {
      this.$store.dispatch("addUser", userObj);
      this.signUpShow = false;
    },
    loginUser(userObj) {
      this.$store.dispatch("loginUser", userObj);
      this.loginShow = false;
    },
    createGuest() {
      var guest = {
        name: 'guest'
      }
      this.createUser(guest)
    },
    startGame() {
      this.gameIsStarting = true
      if (!this.currUser) {
        this.createGuest()
      }
      setTimeout(_=> this.$router.push('game'), 500)
    },
    showReview() { //temp

      this.showReport = true
    }
  },
  components: {
    SignUp,
    LogIn
    // ReportPage,
    // ResultsPage,
  }
};
</script>

<style lang="scss">
h1 {
  font-weight: bold;
  text-transform: uppercase;
}
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
.user-info {
  padding: 0 1rem;
  margin-top: 1rem;
}
.play-button{
  margin: 15px;
}

</style>
