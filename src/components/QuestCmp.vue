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
            :rivalPickAndCorrect="answered && currRound.rivalAnswerId === answer.id && currRound.rivalPts" 
            :rivalPickAndIncorrect="answered && currRound.rivalAnswerId === answer.id && !currRound.rivalPts">
        </answer-cmp>

      </div>
      <!-- currRound.answerIdx === i && currRound.userPts -->
  </div>
</template>

<script>
import answerCmp from './answerCmp'

export default {
//   name: "QuestScreen",
  data() {
      return {
        showAnswers: false,
        startTime: null,
        answered: false
    };
  },
  props: ['quest', 'currRound'],
//   computed: {
//       answers() {
//           return this.shuffleAnswers();
//       }
//   },
//   watch: {
//     //   quest() {
//     //       console.log('currRound changed:', this.currRound)
//     //     //   this.answered = false
//     //       this.showAnswers = false
//     //       setTimeout(_=> {
//     //           this.showAnswers = true
//     //           this.startTime = Date.now()
//     //       }, 500)
//     //   }
//   },
  methods: {
      answerPicked(answerId) {
        if (this.answered) return
        this.answered = true
        this.$emit('questAnswered', answerId, this.answerTime())
        // if (answer === this.quest.correct_answer) {
        //     EventBus.$emit(RIGHT_ANSWER)
        //     this.$emit('answerChosen', true, this.answerTime())
        // } else {
        //     this.$emit('answerChosen', false, this.answerTime())
        // }
    },
    // shuffleAnswers() {
    //   var answers = [];
    //   for (let i = 0; i < this.quest.incorrect_answers.length; i++) {
    //     answers.push(this.quest.incorrect_answers[i]);
    //   }
    //   answers.push(this.quest.correct_answer);
      
    //   for (let i = answers.length - 1; i > 0; i--) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     [answers[i], answers[j]] = [answers[j], answers[i]];
    //   }
    //   return answers
    // },
    answerTime() {
        return Date.now() - this.startTime
    }
  },
  components: {
      answerCmp
  },
  created() {
      console.log(this.quest)
      setTimeout(_=> {
              this.showAnswers = true
              this.startTime = Date.now()
      }, 500)
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
