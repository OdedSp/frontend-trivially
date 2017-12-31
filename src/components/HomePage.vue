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

    <!-- <transition enter-active-class="animated flipInX">
      <count-down :category="quest.category" v-if="countDown"></count-down>
    </transition>
    <transition
      leave-active-class="animated slideOutRight">
      <quest-cmp :currRound="currRound" :quest="quest"
                @questAnswered="questAnswered"
                v-if="showQuest && quest" ></quest-cmp>
    </transition> -->
  </div>
</template>

<script>
import SignUp from './SignUp';
import LogIn from './LogIn';
// import QuestCmp from './QuestCmp';
// import CountDown from './CountDown';

import { mapGetters } from 'vuex'
import { SET_ANSWER_ID } from '../modules/trivia.module'

export default {
  name: "HomePage",
  data() {
    return {
      signUpShow: false,
      loginShow: false,
      showQuest: false,
      gameIsStarting: false
    };
  },
  computed: {
    ...mapGetters([
      'currUser'
      // 'currRound',
      // 'quest'
    ]),
    // currUser() { return { name: 'Nina Bombina' } }
  },
  // watch: {
  //   quest() {
  //     this.showQuest = false
  //     setTimeout(_=> this.showQuest = true, 1000)
  //   }
  // },
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
    // questAnswered(answerId, answerTime) {
    //   console.log({ answerId, answerTime });
    //   this.$store.commit({ type: SET_ANSWER_ID, answerId })
    //   this.$socket.emit('playerAnswer', { answerId, answerTime }) // TODO: add time
    // },
    // startGame() {
    //   this.$socket.emit('joinGameRoom')
    //   this.loginShow = false;
    //   this.signUpShow = false;
    //   if (!this.currUser) {
    //     this.createGuest()
    //   }
    // },
    // getReady() {
    //   setTimeout(() => {
    //     this.countDown = false;
    //     // this.questReady = true;
    //     // setInterval(()=>{

    //     // }, 1000)
    //   }, 2000);
    // },
    // reviewAnswer() {
    //   setTimeout(() => {
    //     this.countDown = true;
    //     // this.questReady = false;
    //     this.currQuestIdx++;
    //   }, 1200);
    // }
  },
  // sockets: {
  //   // nextRound(quest){
  //   //   // this.quest = quest
  //   //   this.isGameOn = true;
  //   //   this.countDown = true;
  //   //   this.getReady();
  //   // }
  // },
  components: {
    SignUp,
    LogIn
    // QuestCmp,
    // CountDown,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
// .navbar-my-style {
//   margin-bottom: 10px;
//   img {
//     width: auto;
//     height: auto;
//   }
// }

</style>
