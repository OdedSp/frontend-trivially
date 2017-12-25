<template>
    <div>
      <form @submit.prevent>
        <p class="control has-icon has-icon-right">
          <input name="name" v-validate="'required|alpha'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('name') }"
            type="text" placeholder="Name">
          <i v-show="errors.has('name')" class="fa fa-warning"></i>
          <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
        <p class="control has-icon has-icon-right">
          <input name="email" v-validate="'required|email'" data-vv-delay="1000"
          :class="{'input': true, 'is-danger': errors.has('email') }"type="text" placeholder="Email">
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
        <p class="control has-icon has-icon-right">
          <input type="password" name="pass" v-validate="'required'" data-vv-delay="1000"
          :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password">
          <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          <input type="password" name="confirm" v-validate="'required|confirmed:password'" data-vv-as="pass"
          :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password, again">
        </p>
        </p>
      </form>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      name: "",
      mail: "",
      password: "",
      confirmation: ""
    };
  }
};
</script>

<style>

</style>
