<template>
  <div>
      <h1 v-html="msg"></h1>
      <div class="buttons">
        <button class="button is-warning" @click="playAgain">Play again?</button>
        <button class="button is-warning" @click="review">{{resButton}}</button>
      </div>
      <transition leave-active-class="animated fadeOutDownBig">
        <report-page v-if="showReport"/>
      </transition>
  </div>
</template>

<script>
import ReportPage from "./ReportPage";
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
    msg() {
      var winner = this.$store.getters.winner
      if (winner === 'user') {
        return `YOU WIN!\
        \n Who's a smart little boy?`
      } else {
        return `YOU LOSE!\
        \n Try to hold your tears`
      }
    },
    resButton() {
      if (this.showReport) {
        return "Close results";
      } else {
        return "View results";
      }
    }
  },
  methods: {
    review() {
      this.showReport = !this.showReport;
    },
    playAgain() {
      this.$router.push('game')
    }
  },
  components: {
    ReportPage
  }
};
</script>

<style lang="scss" scoped>
.buttons {
    margin: auto;
    justify-content: center
}

</style>
