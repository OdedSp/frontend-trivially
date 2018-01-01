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
    computed: {
        answerClass() {
            return {
                'animated flipInX': !this.answered,
                'correct userPick animated rubberBand': this.pickedAndCorrect,
                'incorrect userPick animated shake': this.pickedAndIncorrect,
                'correct rivalPick': this.rivalPickAndCorrect,
                'incorrect rivalPick': this.rivalPickAndIncorrect,
                'correct animated pulse': this.wasAnswer
            }
        }
    }
}
</script>

<style>

</style>
