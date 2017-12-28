<template>
  <div>
      <h1>{{msg}}</h1>
      <button class="button is-warning" @click="playAgain">Play again?</button>
      <button class="button is-warning" @click="review">View results</button>
  </div>
</template>

<script>
export default {
    computed: {
        msg() {
            return 'you win!'
        }
    },
    methods: {
        review(){
            this.$emit('review')
        },
        playAgain() {
            this.$emit('playAgain')
        }
    }
}
</script>

<style>

</style>
