<template>
  <div>
      {{category}}
      <h4>Get ready!</h4>
      {{timeLeft}}
  </div>
</template>

<script>
export default {
    props: ['category'],
    data() {
        return {
            timeLeft: 4
        }
    },
    computed: {
        stopCount(){
            if (timeLeft===0) {
                clearInterval(startCount)
            }
        }
    },
    mounted() {
        var startCount = setInterval(()=>this.timeLeft--, 500)
    }
}
</script>

<style>

</style>
