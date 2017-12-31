<template>
  <div>
    <transition enter-active-class="animated fadeInRightBig" leave-active-class="animated fadeOutLeftBig">
    <quest-result v-for="(quest, i) in report" :key="i" :questReport="report[i]" v-if="currQuestReportIdx===i">
    </quest-result>
    </transition>
    <a class="pagination-previous" @click="flipBack">⪦</a>
    <a class="pagination-next" @click="flipNext">⪧</a>
  </div>
</template>

<script>
import QuestResult from "./QuestResult";

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
  created () {
    console.log(this.report);
    
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
    QuestResult
  }
}
</script>

<style scoped>


a {
  
}
</style>
