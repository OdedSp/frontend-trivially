<template>
  <div class="countdown">
      <h1>{{timeLeft}}</h1>
      <h3>Next: {{category}}</h3>
      <img :src="img" />
      <!-- <h4>Get ready!</h4> -->
  </div>
</template>

<script>
export default {
    props: ['category', 'img'],
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
        // text-align: center;
        // margin-top: 1em;
    }
    h3 {
        font-size: 150%;
        font-weight: bolder;
        margin-bottom: .3em;
        // text-align: center;
    }
}

@media screen and (min-width: 485px) {
    .countdown img {
        border-radius: 6px;
    }
}

</style>
