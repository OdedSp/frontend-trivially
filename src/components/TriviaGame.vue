<template>
  <section class="trivia-game">

    <transition>
      <score-board :currRound="currRound" :user="currUser" :waitingForRival="waitingForRival"
                   :rival="rival" :nextRound="showQuest"
                   v-if="quest && !showKickOff">
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
                  v-if="quest && !showQuest && showCountdown"></count-down>
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

    <!-- <transition enter-active-class="animated zoomIn"> -->
      <kick-off v-if="showKickOff" @kickedOff="closeKickOff" :user="currUser" :rival="rival" />
    <!-- </transitiofn> -->
    
  </section>
</template>

<script>
import QuestCmp from './QuestCmp'
import ScoreBoard from './ScoreBoard'
import KickOff from './KickOffGame'
import CountDown from './CountDown'
import timeLeftBar from './timeLeftBar'
// import { ANSWER_TIME } from '../modules/trivia.module';

import { mapGetters } from 'vuex'
import { RESET_GAME } from '../modules/trivia.module'
import EventBus, { RIVAL_DISCONNECTED } from '../services/BusService'

export default {
  data() {
    return {
      showCountdown: false,
      showQuest: false,
      // rivalLeft: false,
      showRivalLeft: false,
      timeToAnswer: null,
      timerId: null,
      answered: false,
      showKickOff: false
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
    quest(curr, prev) {
      if (!prev) {
        this.showKickOff = true
        return
      }
      this.setNextRound()
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
      // this.rivalLeft = false
      this.showRivalLeft = false
      this.$socket.emit('joinGameRoom', { username: this.currUser.username, avatar: this.currUser.avatar, _id: this.currUser._id})
    },
    setNextRound() {
      this.showQuest = false
      this.timeToAnswer = null
      this.answered = false
      clearInterval(this.timerId)
      if (this.quest) setTimeout(_=> this.showCountdown = true, 1000)
      else if (!this.rival) return
      else this.$router.push('gamedone')
    },
    seeNextQuest() {
      this.showCountdown = false
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
    closeKickOff() {
      this.showKickOff = false
      this.setNextRound()
    }
  },
  components: {
    QuestCmp,
    ScoreBoard,
    CountDown,
    timeLeftBar,
    KickOff
  },
  beforeCreate() {
    this.$store.commit(RESET_GAME)
  },
  created() {
    EventBus.$on(RIVAL_DISCONNECTED, _=> {
      // this.rivalLeft = true
      setTimeout(_=> {
        clearTimeout(this.timerId)
        this.showCountdown = false
        this.timeToAnswer = null
        this.showRivalLeft = true
      }, 1000)
    })
    if (!this.currUser) this.$store.commit('setUser', { username: 'Me',
                                                        avatar: 'http://res.cloudinary.com/koolshooz/image/upload/v1515061041/avatar.png',
                                                        _id: null  }) // temporary (hopefully)
    this.startGame()
  },
  destroyed() {
    this.$socket.emit('leftGame')
    clearInterval(this.timerId)
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
