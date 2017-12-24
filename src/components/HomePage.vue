<template>
  <div>
    <h1>TriVue</h1>
    <button>Play</button>
    <button>Log In</button>
    <button>Sign Up</button>
    <quest></quest>
  </div>
</template>

<script>
import Quest from "./Quest.vue";

export default {
  name: 'HomePage',
  data () {
    return {
      
    }
  },
  components: Quest
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
