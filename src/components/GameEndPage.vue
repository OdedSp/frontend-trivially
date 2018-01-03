<template>
  <div>
    <transition>
      <results-page v-if="!showReport"/>
    </transition>
    <section class="buttons">
      <button class="button is-warning is-bold" @click="playAgain"  v-if="!showReport">Play again?</button>
      <button class="button is-warning toggle"
              :class="{'report': showReport, 'result': !showReport}" @click="review">{{resButton}}</button>
    </section>
    <transition leave-active-class="animated fadeOutDownBig">
      <report-page v-if="showReport"/>
    </transition>
  </div>
</template>

<script>
import ReportPage from "./ReportPage";
import ResultsPage from "./ResultsPage";
import EventBus, {
  RIGHT_ANSWER,
  RIVAL_DISCONNECTED,
  NEW_GAME
} from "../services/BusService";

export default {
  data() {
    return {
      showReport: false
    };
  },
  computed: {
    resButton() {
      if (this.showReport) {
        return "Close results ↑";
      } else {
        return "View results ↓";
      }
    }
  },
  methods: {
    review() {
      this.showReport = !this.showReport;
    },
    playAgain() {
      this.$router.push("game");
    }
  },
  components: {
    ReportPage,
    ResultsPage
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  margin: auto;
  justify-content: center;
  .toggle {
    width: 100%;
    height: 30px
  }
  .report {
    position: fixed;
    top: 52px
  }
  .result{
    position: fixed;
    bottom: 0;
    margin-bottom: 0
  }
}
</style>
