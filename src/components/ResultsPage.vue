<template>
  <section class="result">
      <p class="title" :class="msg.userColor" v-html="msg.notice"></p>
      <p class="subtitle is-4 white" v-html="msg.sub"></p>
      <section class="players">
          <article class="user notification" 
          :class="{
              'is-primary': result.winner==='user',
              'is-danger': result.winner==='rival',
              'is-info': result.winner==='draw'}">
              <p class="name">{{username}}</p>
              <p class="score" v-html="result.userPts"></p>
          </article>
          <article class="rival notification"
          :class="{
              'is-primary': result.winner==='rival',
              'is-danger': result.winner==='user',
              'is-info': result.winner==='draw'}">
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
    <button class="button is-warning is-bold playAgain" @click="playAgain">Play again?</button>
    <button class="button is-warning toggle results-button"
       @click="review">
       <div class="fake-button">View questions <span><icon name="long-arrow-down" scale="1.2" /></span></div>
    </button>
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
        if (user) return user.username
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

// .result-button{
//   width: 100%;
//   height: 30px;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   margin-bottom: 0
// }
.results-button {
  color: var(--main-bg-color);
  background-color: #1e1e1e;
  // margin: 0;
  padding: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  // padding-bottom: 30px;
  width: 100%;
  height: 52px;
  // height: 30px;
  border-radius: 0;
  &:hover {
    background-color: #1e1e1e;
  }
  .fake-button {
    padding: 4px 8px;
    border-radius: 5px;
    background-color: #ffe261;
    box-shadow: -1px 1px 3px 0px orange;
    span {
      position: relative;
      top: 4px;
    }
  }
}
.playAgain {
  margin: 40px;
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