<template>
  
    <div class="answer-time-left">
        <div class="bar rival"  :style="timeLeftRival"></div>
        <div class="bar player" :style="timeLeftPlayer"></div>
    </div>

</template>

<script>
export default {
    props: ['timeToAnswer', 'playerAnswerTime', 'rivalAnswerTime'],
    data() {
        return {
            totalTime: null,
        }
    },
    computed: {
        timeLeftPlayer() {
            var timeToAnswer = (this.playerAnswerTime !== null)
            ? this.totalTime - this.playerAnswerTime
            : this.timeToAnswer
            return `height: ${ 100 * timeToAnswer / this.totalTime }%`
        },
        timeLeftRival() {
            var timeToAnswer = (this.rivalAnswerTime !== null)
            ? this.totalTime - this.rivalAnswerTime
            : this.timeToAnswer
            return `height: ${ 100 * timeToAnswer / this.totalTime }%`
        },
        // rivalAnswerTime() {
        //     return this.$store.state.triviaModule.rivalAnswerTime
        // },
        // playerAnswerTime() {
        //     return this.$store.state.triviaModule.answerTime
        // }
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
    height: calc(100vh - 9em);
    transition: opacity .3s;
    .bar {
        position: absolute;
        bottom: 0;
        width: .7em;
        transition: height 1s linear;
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


.next-leave-active .answer-time-left,
.next-enter-active .answer-time-left,
.back-leave-active .answer-time-left,
.back-enter-active .answer-time-left {
    opacity: 0;
}

</style>
