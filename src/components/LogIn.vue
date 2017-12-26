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
          <input v-model="password" type="password" name="password" v-validate="'required'" data-vv-delay="1000"
          :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password" required>
          <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
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
      name: "",
      password: ""
    };
  },
  methods: {
    closeComp() {
      this.$emit("closeComp");
    },
    sendUser() {
      console.log("submitted");

      var userObj = {
        name: this.name,
        password: this.password
      };
      this.$emit("loginUser", userObj);
    }
  }
};
</script>

<style>

</style>
