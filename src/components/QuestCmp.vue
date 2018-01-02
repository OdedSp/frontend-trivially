<template>
  <div class="question-wrapper">
      <h2 v-html="quest.txt" class="question animated slideInDown"></h2>
      <div class="answer-wrapper">
        <answer-cmp v-for="answer in quest.answers" :key="answer.id"
            @click.native="answerPicked(answer.id)"
            v-if="showAnswers"
            :answer="answer.txt" :answered="answered"
            :pickedAndCorrect="currRound.answerId === answer.id && currRound.userPts" 
            :pickedAndIncorrect="currRound.answerId === answer.id && !currRound.userPts" 
            :rivalPickAndCorrect="currRound.rivalAnswerId === answer.id && currRound.rivalPts" 
            :rivalPickAndIncorrect="currRound.rivalAnswerId === answer.id && !currRound.rivalPts"
            :wasAnswer="correctId === answer.id">
        </answer-cmp>

      </div>
      <!-- currRound.answerIdx === i && currRound.userPts -->
  </div>
</template>

<script>
import answerCmp from './answerCmp'

import { ROUND_START_TIME } from '../modules/trivia.module'

export default {
  data() {
      return {
        showAnswers: false,
        answered: false
        // startTime: null,
    };
  },
  props: ['quest', 'currRound', 'correctId'],
  computed: {
      startTime() {
          return this.$store.getters.roundStartTime
      }
  },
  methods: {
      answerPicked(answerId) {
        if (this.answered) return
        this.answered = true
        this.$emit('questAnswered', answerId, this.answerTime())
    },
    answerTime() {
        return Date.now() - this.startTime
    }
  },
  components: {
      answerCmp
  },
  created() {
      console.log(this.quest)
      !this.startTime
      ? setTimeout(_=> {
              this.showAnswers = true
              this.$store.commit({ type: ROUND_START_TIME, startTime: Date.now() })
      }, 500)
      : this.showAnswers = true
  },
  watch: {
      currRound() {
          console.log({currRound: this.currRound})
      }
  }
};
</script>

<style lang="scss">

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
        position: relative;
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
        &.userPick::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 10px;
            left: 0;
            top: 0;
            border-right: 3px solid dodgerblue;
            border-left: 3px solid dodgerblue;
            background-color: #00002e;
        }
        &.rivalPick::after {
            position: absolute;
            content: '';
            height: 100%;
            width: 10px;
            right: 0;
            top: 0;
            border-right: 3px solid gold;
            border-left: 3px solid gold;
            background-color: #00002e;
        }
    }
}


</style>