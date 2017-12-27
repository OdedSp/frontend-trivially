<template>
  <div class="question-wrapper">
      <h2 v-html="questReport.quest.question" class="question"></h2>
      <div class="answer-wrapper">
        <button v-for="(answer, i) in answers"
        v-html="answer" :key="i"
        :class="{ 'correct': answer === questReport.quest.correct_answer,
                  'animated rubberBand': answer === questReport.quest.correct_answer && questReport.chosenAnswer === answer,
                  'incorrect animated shake': answer !== questReport.quest.correct_answer && questReport.chosenAnswer === answer
                  }"
        class="answer">
        </button>
        {{questReport.time}}s
      </div>
  </div>
</template>

<script>
export default {
  props: ['questReport'],
  computed: {
    answers() {
      return this.shuffleAnswers();
    },
  },
  methods: {
    shuffleAnswers() {
      var answers = [];
      for (let i = 0; i < this.questReport.quest.incorrect_answers.length; i++) {
        answers.push(this.questReport.quest.incorrect_answers[i]);
      }
      answers.push(this.questReport.quest.correct_answer);

      for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
      }
      return answers
    }
  }
};
</script>

<style scoped lang="scss">
.question-wrapper {
  width: 95vw;
  margin: auto;
  h2 {
    font-weight: bold;
  }
}

.answer-wrapper {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 85%;
  .answer {
    // width: 100%;
    z-index: 1;
    outline: none;
    border-style: none;
    padding: 10px;
    margin: 15px;
    background-color: lightblue;
    border-radius: 5px;
    box-shadow: 0 0 4px gray;
    &.correct {
      background: green;
    }
    &.incorrect {
      background: red;
    }
  }
}
</style>