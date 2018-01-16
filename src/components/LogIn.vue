<template>
  <!-- <div> -->
    <div class="login-page-container">
      <h1 class="title is-1">Login</h1>
        <form @submit.prevent="sendUser">
          <p class="control has-icon has-icon-right">
            <input v-model="name" name="name" v-validate="'required|alpha'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('name') }"
              type="text" placeholder="Name" required>
            <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          </p>
          <p class="control has-icon has-icon-right">
            <input v-model="password" type="password" name="password" v-validate="'required'" data-vv-delay="1000"
            :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password" required>
            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          </p>
          <div class="buttons">
            <button class="button is-light" @submit="sendUser">Submit</button>
          </div>
        </form>
        <div class="goto-signup">
          New user? <router-link to="/signup" class="link">Sign Up!</router-link>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import { LOGIN_USER } from '../modules/user.module'
import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    sendUser() {
      var user = {
        username: this.name,
        pass: this.password
      }
      this.$store.dispatch({ type: LOGIN_USER,user})
    }
  },
  computed: {
    ...mapGetters([
      'userIsLoggedIn',
    ]),
    loading(){
      return this.submitted && !this.userIsLoggedIn
    },
    doneLogin(){
      return this.userIsLoggedIn
    }
  },
  watch: {
    doneLogin(val){
      if (val) this.$router.push('/profile')
    }
  }
};
</script>

<style>
  .login-page-container{
    width:60%;
    margin: auto;
  }
  .title {
    color: #6db8d2;
  }

  .goto-signup {
    font-size: 1.5em;
    margin: 1.5em;
    position: relative;
    z-index: 10;
  }

  .goto-signup .link {
    transition: all .3s;
  }
  .goto-signup .link:hover {
    color: #00bcd4;
  }
</style>
