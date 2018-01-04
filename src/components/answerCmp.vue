<template>
    <button   v-html="answer"
                :class="answerClass"
                class="answer"></button>
</template>

<script>
export default {
    props: [
        'answer',
        'answered',
        'pickedAndCorrect',
        'pickedAndIncorrect',
        'rivalPickAndCorrect',
        'rivalPickAndIncorrect',
        'wasAnswer'
    ],
    data() {
        return {
            entranceAnimationOn: true
        }
    },
    computed: {
        answerClass() {
            return {
                'animated flipInX': !this.answered && this.entranceAnimationOn,
                'correct userPick animated rubberBand': this.pickedAndCorrect,
                'incorrect userPick animated shake': this.pickedAndIncorrect,
                'correct rivalPick': this.rivalPickAndCorrect,
                'incorrect rivalPick': this.rivalPickAndIncorrect,
                'correct animated pulse': this.wasAnswer
            }
        }
    },
    mounted() {
        if (this.answered === undefined) return
        setTimeout(_=> this.entranceAnimationOn = false, 700)
    }
}
</script>

<style>

</style>
