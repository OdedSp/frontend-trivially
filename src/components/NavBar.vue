<template>
    <nav class="navbar is-primary navbar-my-style" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <img src="../imgs/logo-small.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </router-link>
        </div>
        <div v-if="userIsLoggedIn" class="user-logout">
          <button @click="logout" class="button is-info">Logout</button>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT_USER } from '../modules/user.module'


export default {
  computed: {
    ...mapGetters([
      'userIsLoggedIn',
    ])
  },
  methods: {
    logout(){
      this.$store.dispatch({type: LOGOUT_USER})
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .user-logout{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
  }
</style>
