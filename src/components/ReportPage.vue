<template>
  <div class="report-page">
    <button class="button is-warning toggle report-button"
       @click="closeReview">
        <div class="fake-button">Close questions 
          <span><icon name="long-arrow-up" scale="1.2" /></span></div>
        
    </button>
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
        <button class="pagination pagination-previous button is-link" @click="flipBack">
          <icon name="arrow-left" />
        </button>
        <button class="pagination pagination-next button is-link" @click="flipNext">
          <icon name="arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestReport from './QuestReport';
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
    // position: absolute;
    height: 100%;
  }
  .flip {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 1em;;
    button {
      flex-grow: 0;
    }
  }
}
.report-button {
  // color: var(--main-bg-color);
  // margin: 0;
  // position: relative;
  // top: -10px;
  // // padding-bottom: 30px;
  // width: 100%;
  // // height: 30px;
  // border-radius: 0;
  // .icon {
  //   position: absolute;
  //   right: 1em;
  //   top: 5px;
  // }
  color: var(--main-bg-color);
  background-color: #1e1e1e;
  // margin: 0;
  padding: 8px;
  position: relative;
  top: -10px;
  // padding-bottom: 30px;
  width: 100%;
  height: 52px;
  // min-height: 2.25em;
  // height: 30px;
  border-radius: 0;
  &:hover {
    background-color: #1e1e1e;
  }
  .fake-button {
    padding: 4px 8px;
    border-radius: 5px;
    background-color: #ffe261;
    box-shadow: -1px 1px 3px 0px orange;
    span {
      position: relative;
      top: 4px;
    }
  }
}

.next-leave-active, .next-enter-active, .back-leave-active, .back-enter-active {
  position: absolute;
  transition: all 1s ease;
}

.next-leave-to {
  transform: translateX(-110%)
}

.next-enter {
  transform: translateX(110%)
}

.back-leave-to {
  transform: translateX(110%)
}

.back-enter {
  transform: translateX(-110%)
}

.pagination {
  color: var(--answer-color);
  &:hover {
    color: var(--answer-color);
  }
}
</style>
