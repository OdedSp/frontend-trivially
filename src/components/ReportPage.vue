<template>
  <div class="report-page">
    <transition enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutLeftBig">
      <quest-report v-for="(quest, i) in report" :key="i" :questReport="report[i]" v-if="currQuestReportIdx===i"/>
    </transition>
    <div class="flip">
      <a class="pagination-previous" @click="flipBack">⪦</a>
      <a class="pagination-next" @click="flipNext">⪧</a>
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
      var p = this.currQuestReportIdx
      if (p < this.report.length-1) {
        this.currQuestReportIdx = -1
        setTimeout(() => {
          this.currQuestReportIdx = p+1
        }, 1000);
      } else {
        this.currQuestReportIdx = -1
        setTimeout(() => {
          this.currQuestReportIdx = 0
        }, 1000);
      }
    },
    flipBack() {
      var p = this.currQuestReportIdx
      if (p > 0) {
        this.currQuestReportIdx = -1
        setTimeout(() => {
          this.currQuestReportIdx = p-1
        }, 1000);
      } else {
        this.currQuestReportIdx = -1
        setTimeout(() => {
          this.currQuestReportIdx = this.report.length-1
        }, 1000);
      }
    },
  },
  components: {
    QuestReport
  }
}
</script>

<style lang="scss" scoped>

.report-page {
height: 60vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
  .flip {
    position: absolute;
    bottom: 10vh;
    
  }
}

</style>
