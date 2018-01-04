<template>
    <div>
      <div class="sign-up-page-container">
        <h1 class="title is-1">Sign Up</h1>
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

              <div v-if="!image" class="select-img-container">
                <h2 class="select-img-title-1">Select an image</h2>
                <input type="file" @change="onFileChange">
              </div>
              <div v-if="loading" class="uploading-container">
                Uploading
                <img class="select-img-loading" src="../imgs/rings.svg" width="64" height="64">
              </div>
              <div v-if="image && !loading" class="select-img-show-uploaded">
                <img :src="image" />
                <button @click="removeImage" class="remove-img-btn">Remove image</button>
              </div>
              <div class="buttons">
                <button class="button is-light" @submit="sendUser">Submit</button>
              </div>
        </form>
      </div>
    </div>
</template>

<script>
import { REGISTER_USER } from '../modules/user.module'
import { mapGetters } from 'vuex'


export default {
  name: 'SignUp',
  data() {
    return {
      name: '',
      mail: '',
      password: '',
      confirmation: '',
      image: '',
      submitted: false,
      imageFile: null
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.imageFile = files[0]
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },
    uploadToCloudinary(file){
      console.log('sending to cloudinary')
    },
    sendUser(){
      if (this.submitted) return
      this.submitted = true
      var user = {
        username: this.name,
        pass: this.password,
        signup_email: this.mail,
        avatar: this.imageFile
      }
      this.$store.dispatch({ type: REGISTER_USER,user})
    }
  },
  computed: {
    ...mapGetters([
      'userIsLoggedIn',
    ]),
    loading(){
      return this.submitted && !this.userIsLoggedIn
    },
    doneRgistering(){
      return this.userIsLoggedIn
    }
  },
  watch: {
    doneRgistering(val){
      if (val) this.$router.push('/profile')
    }
  }
};
</script>

<style scoped>
  .select-img-container{
    display: flex;
    padding: 3%;
    width: 95% !important;
  }
  .select-img-title-1{
    flex: 4;
    text-align: start;
  }
  .select-img-loading{
    width: 64px;
    height: 64px;
  }
  .sign-up-page-container{
    width:60%;
    margin: auto;
  }
  img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
  }
  .title {
    color: #6db8d2;
  }
</style>
