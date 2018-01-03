<template>
  
    <div class="answer-time-left">
        <div class="bar rival"  :style="timeLeftRival" :class="{ second: this.second === 'rival'}"></div>
        <div class="bar player" :style="timeLeftPlayer" :class="{ second: this.second === 'player'}"></div>
    </div>

</template>

<script>
export default {
    props: ['timeToAnswer'],
    data() {
        return {
            totalTime: null,
        }
    },
    computed: {
        timeLeftPlayer() {
            var timeToAnswer = (this.playerAnswerTime)
            ? this.totalTime - this.playerAnswerTime
            : this.timeToAnswer
            return `height: ${ 100 * timeToAnswer / this.totalTime }%`
        },
        timeLeftRival() {
            var timeToAnswer = (this.rivalAnswerTime)
            ? this.totalTime - this.rivalAnswerTime
            : this.timeToAnswer
            return `height: ${ 100 * timeToAnswer / this.totalTime }%`
        },
        rivalAnswerTime() {
            return this.$store.state.triviaModule.rivalAnswerTime
        },
        playerAnswerTime() {
            return this.$store.state.triviaModule.answerTime
        },
        second() {
            if (this.rivalAnswerTime > this.playerAnswerTime) return 'rival'
            return 'player'
        }
    },
    created() {
        this.totalTime = this.timeToAnswer
    }
}
</script>

<style lang="scss">

.answer-time-left {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - 7em);
    .bar {
        position: absolute;
        bottom: 0;
        width: .7em;
        transition: height 1s linear;
        // transition-timing-function: linear;
    }
    .player {
        left: 0;
        background-color: var(--player-color);
        border-radius: 0 5px 0 0;
    }
    .rival {
        right: 0;
        background-color: var(--rival-color);
        border-radius: 5px 0 0 0;
    }
}

</style>
