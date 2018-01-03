<template>
  <div class="question-wrapper">
      <h2 v-html="questReport.quest.txt" class="question"></h2>
      <div class="answer-wrapper">
        <answer-cmp v-for="(answer, i) in questReport.quest.answers" :key="i"
            :answer="answer.txt"
            :pickedAndCorrect="questReport.answerId === answer.id && questReport.userPts" 
            :pickedAndIncorrect="questReport.answerId === answer.id && !questReport.userPts" 
            :rivalPickAndCorrect="questReport.rivalAnswerId === answer.id && questReport.rivalPts" 
            :rivalPickAndIncorrect="questReport.rivalAnswerId === answer.id && !questReport.rivalPts"
            :wasAnswer="questReport.answerId !== answer.id && questReport.rivalAnswerId !== answer.id && questReport.correctAnswerId === answer.id">
        </answer-cmp>
        {{questReport.answerTime/1000}}s
      </div>
  </div>
</template>

<script>
import answerCmp from './answerCmp'

export default {
  props: ['questReport'],
  computed: {},
  methods: {},
  components: {
    answerCmp
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
      background: var(--correct-color);
    }
    &.incorrect {
      background: var(--incorrect-color);
    }
  }
  .question-wrapper {
    max-height: 40vh;
  }
}
</style>