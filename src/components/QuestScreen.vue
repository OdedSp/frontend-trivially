<template>
  <div>
      <h2>{{quest.question}}</h2>
      <button>{{quest.incorrect_answers[1]}}</button>
      <button>{{quest.incorrect_answers[2]}}</button>
      <button>{{quest.incorrect_answers[0]}}</button>
      <button>{{quest.correct_answer}}</button>
  </div>
</template>

<script>
export default {
    name: 'QuestScreen',
    data() {
        return {
        }
    },
    computed: {
        quest(){
            return this.$store.getters.quest
        }
    }
}
</script>

<style>

</style>
