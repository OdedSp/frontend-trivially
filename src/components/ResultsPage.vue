<template>
  <section class="result">
      <p class="title" :class="msg.userColor" v-html="msg.notice"></p>
      <p class="subtitle is-4 white" v-html="msg.sub"></p>
      <section class="players">
          <article class="user notification" 
          :class="{
              'is-primary': result.winner==='user',
              'is-danger': result.winner==='rival'}">
              <p v-html="users" class="name"></p>
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
    users() {
        //temporarily like this, ultimately supposed to return names of both users, avatars and maybe other things
        var user = this.$store.getters.currUser;
        return user.name
    }
  }
};
</script>

<style lang="scss" scoped>
.primary {
  color:#00d1b2
}
.danger {
  color: #ff3860; 
}
.white {
  color: whitesmoke
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