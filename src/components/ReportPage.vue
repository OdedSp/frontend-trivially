<template>
  <div class="report-page">
    <button class="button is-warning toggle report-button"
       @click="closeReview">Close questions ↑</button>
    <!-- <transition enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutLeftBig"> -->
    <div class="report-wrapper">
      <transition :name="direction">
        <div class="report" v-for="(round, i) in report" :key="i" v-if="currQuestReportIdx===i">
          <quest-report :questReport="round"/>
          <time-left-bar :timeToAnswer="10"
          :playerAnswerTime="round.answerTime || 10"
          :rivalAnswerTime="round.rivalAnswerTime || 10" />
        </div>
      </transition>
      <div class="flip">
        <button class="pagination pagination-previous button is-link" @click="flipBack">⪦</button>
        <button class="pagination pagination-next button is-link" @click="flipNext">⪧</button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestReport from "./QuestReport";
import timeLeftBar from './timeLeftBar';

export default {
  data() {
    return {
      currQuestReportIdx: 0,
      direction: 'next',
    }
  },
  computed: {
    report() {
      return this.$store.getters.report
    }
  },
  methods: {
    flipNext() {
      this.direction = 'next'
      var p = this.currQuestReportIdx
      if (p < this.report.length-1) {
        this.currQuestReportIdx = -1
        // setTimeout(() => {
          this.currQuestReportIdx = p+1
        // }, 1000);
      } else {
        this.currQuestReportIdx = -1
        // setTimeout(() => {
          this.currQuestReportIdx = 0
        // }, 1000);
      }
    },
    flipBack() {
      this.direction = 'back'
      var p = this.currQuestReportIdx
      if (p > 0) {
        this.currQuestReportIdx = -1
        // setTimeout(() => {
          this.currQuestReportIdx = p-1
        // }, 1000);
      } else {
        this.currQuestReportIdx = -1
        // setTimeout(() => {
          this.currQuestReportIdx = this.report.length-1
        // }, 1000);
      }
    },
    closeReview() {
      this.$emit('review')
    }
  },
  components: {
    QuestReport,
    timeLeftBar
  }
}
</script>

<style lang="scss" scoped>

.report-wrapper {
  position: relative;
  height: calc(100vh - 99px);
  // border: 1px solid gold;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  .report {
    position: absolute;
    height: 100%;
  }
  .flip {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 5vh;
    button {
      flex-grow: 0;
    }
  }
}
.report-button {
  margin: 0;
  position: relative;
  top: -10px;
  padding-bottom: 30px;
  width: 100%;
  height: 30px
}

.next-leave-active, .next-enter-active, .back-leave-active, .back-enter-active {
  position: absolute;
  transition: all 1s ease;
}

.next-leave-to {
  transform: translateX(110%)
}

.next-enter {
  transform: translateX(-110%)
}

.back-leave-to {
  transform: translateX(-110%)
}

.back-enter {
  transform: translateX(110%)
}

</style>
