<template>
    <div>
      <form @submit.prevent="sendUser">
        <p class="control has-icon has-icon-right">
          <input v-model="name" name="name" v-validate="'required|alpha'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('name') }"
            type="text" placeholder="Name" required>
          <i v-show="errors.has('name')" class="fa fa-warning"></i>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
        <p class="control has-icon has-icon-right">
          <input v-model="mail" name="email" v-validate="'required|email'" data-vv-delay="1000"
          :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email" required>
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
        <p class="control has-icon has-icon-right">
          <input v-model="password" type="password" name="password" v-validate="'required'" data-vv-delay="1000"
          :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password" required>
          <span v-show="errors.has('password') && (password!==confirmation)" class="help is-danger">{{ errors.first('password') }}</span>
          <span v-show="errors.has('confirm') && (password!==confirmation)" class="help is-danger">{{ errors.first('confirm') }}</span>
          <input v-model="confirmation" type="password" name="confirm" v-validate="'required|confirmed:password'" data-vv-as="password"
          :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password, again" required>
        </p>
        <div class="buttons">
          <button class="button is-light" @submit="sendUser">✓</button>
          <button class="button is-dark" @click="closeComp">X</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      mail: '',
      password: '',
      confirmation: ''
    };
  },
  methods: {
    closeComp(){
      this.$emit('closeComp')
    },
    sendUser(){
      console.log('submitted');
      
      var userObj = {
        name: this.name,
        mail: this.mail,
        password: this.password
      }
      this.$emit('createUser', userObj)
    }
  }
};
</script>

<style>

</style>
