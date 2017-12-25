<template>
  <div>
    <section class="game-start" v-if="!isGameOn">
      <h1>TriVue</h1>
      <button @click="startGame">Play</button>
      <button>Log In</button>
      <button>Sign Up</button>
    </section>
    <load-screen :category="quests[currQuestIdx].category" v-if="loadScreen"></load-screen>
    <quest-screen :quest="quests[currQuestIdx]" @answerChosen="questAnswered" v-if="questReady"></quest-screen>
  </div>
</template>

<script>
import QuestScreen from './QuestScreen';
import LoadScreen from './LoadScreen';

export default {
  name: 'HomePage',
  data () {
    return {
      isGameOn: false,
      loadScreen: false,
      questReady: false,
      quests: this.$store.state.triviaModule.questions,
      currQuestIdx: 0
    }
  },
  methods:{
    questAnswered(result, time){
      console.log(result, time);
      if (this.currQuestIdx !== this.quests.length - 1) {
        this.getReady()
        this.currQuestIdx++;
      } 
    },
    startGame(){
      this.isGameOn = true
      this.loadScreen = true
      this.getReady()
    },
    getReady(){
      setTimeout(() => {
        this.loadScreen = false
        this.questReady = true
      }, 5);
    }
  },
  components: {
    QuestScreen,
    LoadScreen
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
