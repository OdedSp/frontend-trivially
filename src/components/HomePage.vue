<template>
  <div>
    <transition enter-active-class="animated slideInDown">
      <nav v-if="isGameOn" class="navbar is-primary navbar-my-style" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
            <img src="../imgs/logo-small.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a>
        </div>
      </nav>
    </transition>
    <div v-if="!currUser" class="buttons">
      <button class="button is-info" @click="openLogin">Log In</button>
      <button class="button is-info" @click="openSignUp">Sign Up</button>
    </div>
    <div v-else class="status-bar">
      <div class="user">
        <p>{{currUser.name}}</p>
        <p v-if="isGameOn">pnts</p>
      </div>
      <div v-if="isGameOn" class="opponent">
        <p>opponent name</p>
        <!-- <p>{{timeLeft}}</p> -->
        <p>pnts</p>
      </div>
    </div>
    <transition leave-active-class="animated zoomOut">
      <section class="game-start" v-if="!isGameOn">
        <section class="hero is-primary">
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
        <button class="button is-success play-button" @click="startGame">Play</button>
      </section>
    </transition>

    <sign-up v-show="signUpShow" @closeComp="signUpShow=false" @createUser="createUser"></sign-up>
    <log-in v-show="loginShow" @closeComp="loginShow=false" @loginUser="loginUser"></log-in>    
    <transition enter-active-class="animated flipInX">
      <count-down :category="quests[currQuestIdx].category" v-if="countDown"></count-down>
    </transition>
    <transition
      leave-active-class="animated slideOutRight">
      <quest-cmp :quest="quests[currQuestIdx]" @answerChosen="questAnswered" @lastQuest="endGame" v-if="questReady" ></quest-cmp>
    </transition>
    <results-page v-if="gameEnd" :report="gameReport"></results-page>
  </div>
</template>

<script>
import QuestCmp from "./QuestCmp";
import CountDown from "./CountDown";
import ResultsPage from "./ResultsPage";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

export default {
  name: "HomePage",
  data() {
    return {
      isGameOn: false,
      countDown: false,
      questReady: false,
      signUpShow: false,
      loginShow: false,
      gameEnd: false,
      quests: this.$store.state.triviaModule.questions,
      gameReport: [],
      currQuestIdx: 0,
      timeLeft: 10
    };
  },
  computed: {
    currUser() {
      return this.$store.getters.currUser
    }
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
    questAnswered(result, time, answer) {
      this.gameReport.push({
        quest: this.quests[this.currQuestIdx],
        chosenAnswer: answer,
        time: time
        })
      console.log(result, time);
      if (this.currQuestIdx !== this.quests.length - 1) {
        this.reviewAnswer();
        this.getReady();
      } else {
        this.endGame();
      }
    },
    startGame() {
      this.loginShow = false;
      this.signUpShow = false;
      if (!this.currUser) {
        this.createGuest()
      }
      this.isGameOn = true;
      this.countDown = true;
      this.getReady();
    },
    getReady() {
      setTimeout(() => {
        this.countDown = false;
        this.questReady = true;
        // setInterval(()=>{

        // }, 1000)
      }, 2000);
    },
    reviewAnswer() {
      setTimeout(() => {
        this.countDown = true;
        this.questReady = false;
        this.currQuestIdx++;
      }, 1200);
    },
    endGame() {
      setTimeout(() => {
        this.questReady = false;
        // this.isGameOn = false;
        this.currQuestIdx = 0;
        this.gameEnd = true
      }, 1200);
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
    }
  },
  components: {
    QuestCmp,
    CountDown,
    ResultsPage,
    SignUp,
    LogIn
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-weight: bold;
  text-transform: uppercase;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.play-button{
  margin: 15px;
}
.navbar-my-style {
  margin-bottom: 10px;
  img {
    width: auto;
    height: auto;
  }
}

</style>
