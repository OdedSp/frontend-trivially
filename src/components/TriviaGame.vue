<template>
  <section>

    <transition>
      <score-board :currRound="currRound" :user="currUser" :rival="false" :nextRound="showQuest">
      </score-board>
    </transition>

    <div v-if="waitingForRival" class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>
    
    <transition leave-active-class="animated slideOutRight">
      <quest-cmp :currRound="currRound" :quest="quest" :correctId="correctAnswerId"
                @questAnswered="questAnswered"
                v-if="showQuest && quest" ></quest-cmp>
    </transition>

    <transition enter-active-class="animated flipInX">
      <count-down @countedDown="seeNextQuest"
                  :category="quest.category" v-if="!showQuest && countdown"></count-down>
    </transition>

    <transition enter-active-class="animated fadeIn">
      <div v-if="showRivalLeft">
        <h2 class="rival-left"> Your opponent has left the game </h2>
        <button class="button is-success play-button" @click="startGame">
          Play again
        </button>
      </div>
    </transition>
    
    
  </section>
</template>

<script>
import QuestCmp from './QuestCmp'
import ScoreBoard from './ScoreBoard'
import CountDown from './CountDown'
import { ANSWER_TIME } from '../modules/trivia.module';

import { mapGetters } from 'vuex'
import EventBus, { RIVAL_DISCONNECTED } from '../services/BusService'

export default {
  data() {
    return {
      countdown: false,
      showQuest: false,
      rivalLeft: false,
      showRivalLeft: false
    };
  },
  computed: {
    ...mapGetters([
      'currUser',
      // 'rival',
      'currRound',
      'quest',
      'correctAnswerId',
      'waitingForRival'
    ])
  },
  watch: {
    quest() {
      this.showQuest = false
      if (this.quest) setTimeout(_=> this.countdown = true, 1000)
      else if (this.rivalLeft) return
      else this.$router.push('result') // for now
    }
  },
  methods: {
    questAnswered(answerId, answerTime) {
      this.$store.commit({type: ANSWER_TIME, answerTime})
      this.$socket.emit('playerAnswer', { answerId, answerTime })
    },
    startGame() {
      this.rivalLeft = false
      this.showRivalLeft = false
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
    EventBus.$on(RIVAL_DISCONNECTED, _=> {
      this.rivalLeft = true
      setTimeout(_=> this.showRivalLeft = true, 1000)
    })
    if (!this.currUser) this.$store.dispatch("addUser", {name: 'Guest'}) // temporary (hopefully)
    if (this.quest) {
      this.showQuest = true
      return
    }
    this.startGame()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  h2.rival-left {
    font-size: 1.3em;
    margin: 1.3em auto;
  }
</style>
