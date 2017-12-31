<template>
  <div class="countdown">
      {{category}}
      <h4>Get ready!</h4>
      <h1>{{timeLeft}}</h1>
  </div>
</template>

<script>
export default {
    props: ['category'],
    data() {
        return {
            timeLeft: 3,
            intervalId: null
        }
    },
    mounted() {
        this.intervalId = setInterval(_=> {
            this.timeLeft--
            if (this.timeLeft === 1) {
                clearInterval(this.intervalId)
                setTimeout(_=> this.$emit('countedDown'), 1000)
            }
        }, 1000)
    }
}
</script>

<style lang="scss">

.countdown {
    h1 {
        font-size: 350%;
        font-weight: bolder;
        text-align: center;
        margin-top: 1em;
    }
}

</style>
