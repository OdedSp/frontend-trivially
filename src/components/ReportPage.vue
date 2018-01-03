<template>
  <div class="report-page">
    <button class="button is-warning toggle report-button"
       @click="closeReview">Close questions ↑</button>
    <!-- <transition enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutLeftBig"> -->
    <div class="report-wrapper">
      <transition :name="direction" mode="out-in">
        <quest-report v-for="(quest, i) in report" :key="i" :questReport="quest" v-if="currQuestReportIdx===i"/>
      </transition>
      <div class="flip">
        <a class="pagination pagination-previous" @click="flipBack">⪦</a>
        <a class="pagination pagination-next" @click="flipNext">⪧</a>
      </div>
    </div>
  </div>
</template>

<script>
import QuestReport from "./QuestReport";

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
    QuestReport
  }
}
</script>

<style lang="scss" scoped>

.report-wrapper {
  // height: calc(100vh - 90px);
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  .flip {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 5vh;
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
  transition: all .5s ease;
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
