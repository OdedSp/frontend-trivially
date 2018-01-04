<template>
  <div>
    <transition :name="direction">
      <results-page @review="review" v-if="!showReport"/>
      <report-page @review="review" v-if="showReport"/>
    </transition>
    <!-- <transition leave-active-class="animated fadeOutUpBig" enter-active-class="animated fadeInDownBig">
      <results-page @review="review" v-if="!showReport"/>
    </transition>
    <transition leave-active-class="animated fadeOutDownBig" enter-active-class="animated fadeInUpBig">
      <report-page @review="review" v-if="showReport"/>
    </transition> -->
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
    direction() {
      return (this.showReport) ? 'down' : 'up'
    }
  },
  methods: {
    review() {
      this.showReport = !this.showReport;
    }
  },
  components: {
    ReportPage,
    ResultsPage
  }
};
</script>

<style lang="scss" scoped>

.down-leave-active, .up-leave-active, .up-enter-active {
  position: absolute;
  width: 100vw;
  transition: all 2s ease;
}

.down-enter-active {
  transition: all 2s ease;
}

.down-enter, .up-leave-to {
  transform: translateY(-110vh)
}

.down-leave-to, .up-enter {
  transform: translateY(110vh)
}

</style>
