<template>
  <div>
      <h2 v-html="quest.question"></h2>
      <button v-for="answer in answers" @click="answerChosen(answer)" v-html="answer"></button>
  </div>
</template>

<script>
export default {
  name: "QuestScreen",
  data() {
      return {
        startTime: null
    };
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
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return answers
    },
    answerTime() {
        return (Date.now()-this.startTime)/1000
    }
  },
  created(){
      this.startTime = Date.now()
  }
};
</script>

<style>

</style>
