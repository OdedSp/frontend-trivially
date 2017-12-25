<template>
  <div>
    <section class="game-start" v-if="!isGameOn">
      <h1>TriVue</h1>
      <button @click="startGame">Play</button>
      <button>Log In</button>
      <button>Sign Up</button>
    </section>
    <sign-up v-if="signUpShow"></sign-up>
    <count-down :category="quests[currQuestIdx].category" v-if="countDown"></count-down>
    <quest-cmp :quest="quests[currQuestIdx]" @answerChosen="questAnswered" v-if="questReady"></quest-cmp>
  </div>
</template>

<script>
import QuestCmp from './QuestCmp';
import CountDown from './CountDown';
import SignUp from './SignUp';

export default {
  name: 'HomePage',
  data () {
    return {
      isGameOn: false,
      countDown: false,
      questReady: false,
      signUpShow: false,
      quests: this.$store.state.triviaModule.questions,
      currQuestIdx: 0
    }
  },
  methods:{
    questAnswered(result, time){
      console.log(result, time);
      if (this.currQuestIdx !== this.quests.length - 1) {
        this.reviewAnswer()
        this.getReady()
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
    }
  },
  components: {
    QuestCmp,
    CountDown,
    SignUp
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
