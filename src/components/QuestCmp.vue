<template>
  <div>
      <h2 v-html="quest.question"></h2>
      <button v-for="answer in answers" @click="answerChosen(answer)"
      v-html="answer"
      :class="{ correct: answer === quest.correct_answer && userAnswer === answer,
                incorrect: answer !== quest.correct_answer && userAnswer === answer }"></button>
  </div>
</template>

<script>
export default {
  name: "QuestScreen",
  data() {
      return {
        startTime: null,
        // isCorrect: null,
        userAnswer: null
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
        this.answered = true
        this.userAnswer = answer
        if (answer === this.quest.correct_answer) {
            // this.isCorrect = true
            setTimeout(() => {
                this.$emit('answerChosen', true, this.answerTime())
            }, 2000);
        } else {
            this.isCorrect = false
            setTimeout(() => {
                this.$emit('answerChosen', false, this.answerTime())
            }, 2000);
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
.correct {
    background: green
}
.incorrect {
    background: red
}
</style>
