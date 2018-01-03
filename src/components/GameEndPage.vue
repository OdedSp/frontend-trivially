<template>
  <div>
    <transition leave-active-class="animated fadeOutUpBig" enter-active-class="animated fadeInDownBig">
      <results-page @review="review" v-if="!showReport"/>
    </transition>
    <transition leave-active-class="animated fadeOutDownBig" enter-active-class="animated fadeInUpBig">
      <report-page @review="review" v-if="showReport"/>
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
  computed: {},
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
</style>
