<template>
  <section class="trivia-game">

    <transition>
      <score-board :currRound="currRound" :user="currUser" :waitingForRival="waitingForRival"
                   :rival="rival" :nextRound="showQuest">
      </score-board>
    </transition>

    <div v-if="waitingForRival" class="spinner">
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>
    
    <transition leave-active-class="animated slideOutRight">
      <quest-cmp :currRound="currRound" :quest="quest" :correctId="correctAnswerId"
                @questAnswered="questAnswered" @startTheClock="startTheClock"
                v-if="showQuest && quest" ></quest-cmp>
    </transition>

    <transition enter-active-class="animated flipInX">
      <count-down @countedDown="seeNextQuest"
                  :category="quest.category"  :img="quest.categoryImg"
                  v-if="!showQuest && countdown"></count-down>
    </transition>

    <transition enter-active-class="animated fadeIn">
      <div v-if="showRivalLeft">
        <h2 class="rival-left"> Your opponent has left the game </h2>
        <button class="button is-success play-button" @click="startGame">
          Play again
        </button>
      </div>
    </transition>

    <time-left-bar v-if="timeToAnswer !== null" :timeToAnswer="timeToAnswer"
            :playerAnswerTime="playerAnswerTime" :rivalAnswerTime="rivalAnswerTime"></time-left-bar>
    
    
  </section>
</template>

<script>
import QuestCmp from './QuestCmp'
import ScoreBoard from './ScoreBoard'
import CountDown from './CountDown'
import timeLeftBar from './timeLeftBar'
// import { ANSWER_TIME } from '../modules/trivia.module';

import { mapGetters } from 'vuex'
import EventBus, { RIVAL_DISCONNECTED } from '../services/BusService'

export default {
  data() {
    return {
      countdown: false,
      showQuest: false,
      rivalLeft: false,
      showRivalLeft: false,
      timeToAnswer: null,
      timerId: null,
      answered: false
    };
  },
  computed: {
    ...mapGetters([
      'currUser',
      'rival',
      'currRound',
      'quest',
      'correctAnswerId',
      'waitingForRival'
    ]),
    rivalAnswerTime() {
      return this.$store.state.triviaModule.rivalAnswerTime
    },
    playerAnswerTime() {
      return this.$store.state.triviaModule.answerTime
    }
  },
  watch: {
    quest() {
      this.showQuest = false
      this.timeToAnswer = null
      this.answered = false
      clearInterval(this.timerId)
      if (this.quest) setTimeout(_=> this.countdown = true, 1000)
      else if (this.rivalLeft) return
      else this.$router.push('gamedone') // for now
    }
  },
  methods: {
    questAnswered(answerId, answerTime) {
      if (this.answered) return
      this.answered = true
      this.$socket.emit('playerAnswer', { answerId, answerTime })
      // this.$store.commit({type: ANSWER_TIME, answerTime})
    },
    startGame() {
      this.rivalLeft = false
      this.showRivalLeft = false
      this.$socket.emit('joinGameRoom', { username: this.currUser.username, avatar: this.currUser.avatar, _id: this.currUser._id})
    },
    seeNextQuest() {
      this.countdown = false
      this.timeToAnswer = 10
      this.showQuest = true
    },
    startTheClock() {
      this.timerId = setInterval(_=> {
        this.timeToAnswer--
        if (this.timeToAnswer === 0) {
          clearInterval(this.timerId)
          if (!this.answered) setTimeout(_=> this.questAnswered('noAnswer', null), 1000)
        }
      }, 1000)
    },
    destroyed() {
      clearInterval(this.timerId)
    }
  },
  components: {
    QuestCmp,
    ScoreBoard,
    CountDown,
    timeLeftBar
  },
  created() {
    // if (this.$store.getters.gameInProgress) return
    EventBus.$on(RIVAL_DISCONNECTED, _=> {
      this.rivalLeft = true
      setTimeout(_=> this.showRivalLeft = true, 1000)
    })
    if (!this.currUser) this.$store.commit('setUser', { username: 'Me',
                                                        avatar: 'http://res.cloudinary.com/koolshooz/image/upload/v1515061041/avatar.png',
                                                        _id: null  }) // temporary (hopefully)
    // if (this.quest) {
    //   this.showQuest = true
    //   return
    // }
    this.startGame()
  },
  destroyed() {
    this.$socket.emit('leftGame')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.trivia-game {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: calc(100vh - 62px);
  // .question-wrapper {
  //   flex-grow: 1;
  //   display: flex;
  //   flex-direction: column;
  //   .answer-wrapper {
  //     flex-grow: 1;
  //     display: flex;
  //   }
  // }
}

  h2.rival-left {
    font-size: 1.3em;
    margin: 1.3em auto;
  }
</style>
