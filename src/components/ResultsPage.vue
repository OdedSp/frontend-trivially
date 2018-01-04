<template>
  <section class="result">
      <p class="title" :class="msg.userColor" v-html="msg.notice"></p>
      <p class="subtitle is-4 white" v-html="msg.sub"></p>
      <section class="players">
          <article class="user notification" 
          :class="{
              'is-primary': result.winner==='user',
              'is-danger': result.winner==='rival'}">
              <p class="name">{{username}}</p>
              <p class="score" v-html="result.userPts"></p>
          </article>
          <article class="rival notification"
          :class="{
              'is-primary': result.winner==='rival',
              'is-danger': result.winner==='user'}">
              <p class="name">Rival</p>
              <p class="score" v-html="result.rivalPts"></p>
          </article>
      </section>
      <!-- <p class="subtitle white">
        <span :class="msg.userColor">
          {{result.userPts}}
        </span>{{msg.direction}}
        <span :class="msg.rivalColor">
          {{result.rivalPts}}
        </span>
      </p> -->
    <button class="button is-warning is-bold" @click="playAgain">Play again?</button>
    <button class="button is-warning toggle resultPage"
       @click="review">View questions ↓</button>
  </section>
</template>

<script>
export default {
  computed: {
    msg() {
      if (this.result.winner === 'user') {
        return {
          notice: `YOU WIN!`,
          sub: `Way to go!`,
          userColor: "primary",
          rivalColor: "danger",
          direction: ">"
        };
      } else if (this.result.winner === 'rival') {
        return {
          notice: `YOU LOSE!`,
          sub: `Try to hold your tears`,
          userColor: "danger",
          rivalColor: "primary",
          direction: "<"
        };
      } else {
        return {
          notice: `IT'S A DRAW!`,
          sub: `You two are equally matched`,
          userColor: "white",
          rivalColor: "white",
          direction: "="
        };
      }
    },
    result() {
      return this.$store.getters.result;
    },
    username() {
        //temporarily like this, ultimately supposed to return names of both users, avatars and maybe other things
        var user = this.$store.getters.currUser;
        return user.username
    }
  },
  methods: {
    playAgain() {
      this.$router.push("game");
    },
    review() {
      this.$emit('review')
    }
  }
};
</script>

<style lang="scss" scoped>
.primary {
  color:var(--correct-color)
}
.danger {
  color: var(--incorrect-color); 
}
.white {
  color: whitesmoke;
}

.result {
  height: calc(100vh - 63px);
}

.resultPage{
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 0
}

.players{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    article {
        height: 100%;
        width: 50%;
        margin: 5px;
    }
}
</style>