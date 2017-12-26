<template>
  <div class="question-wrapper">
      <h2 v-html="quest.question" class="question animated slideInDown"></h2>
      <div class="answer-wrapper">
        <button v-for="(answer, i) in answers" @click="answerChosen(answer)"
        v-html="answer" :key="i"
        :class="{ 'correct animated rubberBand': answer === quest.correct_answer && userAnswer === answer,
                  'incorrect animated shake': answer !== quest.correct_answer && userAnswer === answer,
                  'animated flipInX': !userAnswer }"
        class="answer"></button>
      </div>
  </div>
</template>

<script>
import EventBus, { RIGHT_ANSWER } from '../services/BusService'

export default {
  name: "QuestScreen",
  data() {
      return {
        startTime: null,
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
        if (this.userAnswer) return
        this.userAnswer = answer
        if (answer === this.quest.correct_answer) {
            EventBus.$emit(RIGHT_ANSWER)
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
        return Math.floor((Date.now() - this.startTime) / 1000)
    }
  },
  created() {
      this.startTime = Date.now()
  }
};
</script>

<style scoped lang="scss">

.question-wrapper {
    width: 95vw;
    margin: auto;
    h2 {
        font-weight: bold
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
            background: green
        }
        &.incorrect {
            background: red
        }
    }
}


</style>
