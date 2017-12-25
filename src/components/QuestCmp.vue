<template>
  <div class="question-wrapper">
      <h2 v-html="quest.question"></h2>
      <button v-for="(answer, i) in answers" @click="answerChosen(answer)"
      :key="i" v-html="answer" class="answer-option"></button>
  </div>
</template>

<script>
export default {
  name: "QuestScreen",
  data() {
      return {
        startTime: null,
    }
  },
  props: ["quest"],
  computed: {
      answers() {
          return this.shuffleAnswers();
      }
  },
  methods: {
      answerChosen(answer) {
        console.log("chose an answer");
        if (answer === this.quest.correct_answer) {
            this.$emit('answerChosen', true, this.answerTime())
        } else {
            this.$emit('answerChosen', false, this.answerTime())
        }
    },
    shuffleAnswers() {
      var answers = [];
      for (let i = 0; i < this.quest.incorrect_answers.length; i++) {
        answers.push(this.quest.incorrect_answers[i]);
      }
      answers.push(this.quest.correct_answer);
      
      for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return answers
    },
    answerTime() {
        return Math.floor((Date.now() - this.startTime) / 500) // in steps of half a second
    }
  },
  created() {
      this.startTime = Date.now()
  }
};
</script>

<style>

</style>
