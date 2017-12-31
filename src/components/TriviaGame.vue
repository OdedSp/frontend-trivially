<template>
  <section>

    <transition>
      <score-board :currRound="currRound" :user="currUser" :rival="false" :nextRound="showQuest">
      </score-board>
    </transition>
    
    <transition leave-active-class="animated slideOutRight">
      <quest-cmp :currRound="currRound" :quest="quest"
                @questAnswered="questAnswered"
                v-if="showQuest && quest" ></quest-cmp>
    </transition>

    <transition enter-active-class="animated flipInX">
      <count-down @countedDown="seeNextQuest"
                  :category="quest.category" v-if="!showQuest && countdown"></count-down>
    </transition>
    
    
  </section>
</template>

<script>
import QuestCmp from './QuestCmp'
import ScoreBoard from './ScoreBoard'
import CountDown from './CountDown'

import { mapGetters } from 'vuex'
import { SET_ANSWER_ID } from '../modules/trivia.module'

export default {
  data() {
    return {
      countdown: false,
      showQuest: false,
      timeLeft: 10, // curently not in use
    };
  },
  computed: {
    ...mapGetters([
      'currUser',
      // 'rival',
      'currRound',
      'quest'
    ])
  },
  watch: {
    quest() {
      this.showQuest = false
      if (this.quest) setTimeout(_=> this.countdown = true, 1000)
      else this.$router.push('/') // for now
    }
  },
  methods: {
    questAnswered(answerId, answerTime) {
      console.log({ answerId, answerTime });
      this.$store.commit({ type: SET_ANSWER_ID, answerId })
      this.$socket.emit('playerAnswer', { answerId, answerTime })
    },
    startGame() {
      this.$socket.emit('joinGameRoom')
    },
    seeNextQuest() {
      this.countdown = false
      this.showQuest = true
    }
  },
  components: {
    QuestCmp,
    ScoreBoard,
    CountDown
  },
  created() {
    // if (this.$store.getters.gameInProgress) return
    if (!this.currUser) this.$store.dispatch("addUser", {name: 'Guest'}) // temporary (hopefully)
    this.startGame()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
