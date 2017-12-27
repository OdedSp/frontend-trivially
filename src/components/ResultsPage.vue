<template>
  <div>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
    <quest-result v-for="(quest, i) in report" :key="i" :questReport="report[i]" v-if="currQuestReportIdx===i">swipeRight:{{flipNext}}</quest-result>
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
      direction: 'next'
    }
  },
  props: ['report'],
  methods: {
    flipNext() {
      if (this.currQuestReportIdx < this.report.length-1) {
        this.currQuestReportIdx++
      } else {
        this.currQuestReportIdx = 0
      }
    },
    flipBack() {
      if (this.currQuestReportIdx > 0) {
        this.currQuestReportIdx--
      } else {
        this.currQuestReportIdx = this.report.length-1
      }
    },
  },
  components: {
    QuestResult
  }
}
</script>

<style>

</style>
