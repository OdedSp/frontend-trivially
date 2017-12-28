<template>
  <div class="question-wrapper">
      <h2 v-html="currRound.quest.quest" class="question animated slideInDown"></h2>
      <div class="answer-wrapper">
        <answer-cmp v-for="(answer, i) in currRound.quest.answers" :key="i"
            @click.native="answerPicked(answer, i)"
            v-if="showAnswers"
            :answer="answer" :answered="answered"
            :pickedAndCorrect="currRound.answerIdx === i && currRound.userPts" 
            :pickedAndIncorrect="currRound.answerIdx === i && !currRound.userPts" 
            :rivalPickAndCorrect="answered && currRound.rivalAnswerIdx === i && currRound.rivalPts" 
            :rivalPickAndIncorrect="answered && currRound.rivalAnswerIdx === i && !currRound.rivalPts">
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
      answerPicked(answer, answerIdx) {
        if (this.answered) return
        this.answered = true
        this.$emit('questAnswered', { answer, answerIdx }, this.answerTime())
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
        return Math.floor((Date.now() - this.startTime) / 1000)
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
