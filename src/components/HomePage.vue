<template>
  <div>
    <section class="game-start" v-if="!isGameOn">
      <h1>TriVue</h1>
      <button class="button is-success" @click="startGame">Play</button>
      <button class="button is-primary" @click="openLogin">Log In</button>
      <button class="button is-info" @click="openSignUp">Sign Up</button>
    </section>
    <sign-up v-show="signUpShow" @closeComp="signUpShow=false" @createUser="createUser"></sign-up>
    <log-in v-show="loginShow" @closeComp="loginShow=false" @loginUser="loginUser"></log-in>    
    <count-down :category="quests[currQuestIdx].category" v-if="countDown"></count-down>
    <quest-cmp :quest="quests[currQuestIdx]" @answerChosen="questAnswered" @lastQuest="endGame" v-if="questReady" ></quest-cmp>
  </div>
</template>

<script>
import QuestCmp from './QuestCmp';
import CountDown from './CountDown';
import SignUp from './SignUp';
import LogIn from './LogIn';

export default {
  name: 'HomePage',
  data () {
    return {
      isGameOn: false,
      countDown: false,
      questReady: false,
      signUpShow: false,
      loginShow: false,
      quests: this.$store.state.triviaModule.questions,
      currQuestIdx: 0
    }
  },
  methods:{
    openSignUp(){
      this.signUpShow = !this.signUpShow
      if (this.loginShow) {
        this.loginShow = false
      }
    },
    openLogin() {
      this.loginShow = !this.loginShow
      if (this.signUpShow) {
        this.signUpShow = false
      }
    },
    questAnswered(result, time){
      console.log(result, time);
      if (this.currQuestIdx !== this.quests.length - 1) {
        this.reviewAnswer()
        this.getReady()
      } else {
        this.endGame()
      }
    },
    startGame(){
      this.isGameOn = true
      this.countDown = true
      this.getReady()
    },
    getReady(){
      setTimeout(() => {
        this.countDown = false
        this.questReady = true
      }, 2000);
    },
    reviewAnswer(){
      setTimeout(() => {
        this.countDown = true
        this.questReady = false
        this.currQuestIdx++;
      }, 1200);
    },
    endGame(){
      setTimeout(() => {
        this.questReady = false
        this.isGameOn = false
      }, 1200);
    },
    createUser(userObj) {
      
      this.signUpShow = false
    },
    loginUser (userObj) {
      
      this.loginShow = false
    }
  },
  components: {
    QuestCmp,
    CountDown,
    SignUp,
    LogIn
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
</style>
