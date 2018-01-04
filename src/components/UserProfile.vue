<template>
    <div class="page-container">
      <h1 class="title is-1">Profile</h1>
      <img :src="avatar" />
      <div class="user-details-container">
        <div class="user-details-1">
            <h4 class="user-details-title">Name: </h4>
            <h4 class="user-details-title">Email: </h4>
        </div>
        <div class="user-details-2">
            <div>{{currUser.username}}</div>
            <div>{{currUser.signup_email}}</div>
        </div>
      </div>
        <button class="button is-success play-button" @click="startGame">Play</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'UserProfile',
    methods: {
        startGame() {
            this.$router.push('game')
        }
    },
    computed: {  
        ...mapGetters([
        'currUser',
        ]),
        avatar(){
         return (this.currUser)? this.currUser.avatar : ''
        }
    }
}
</script>

<style scoped>
    .page-container{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        height: calc(100% - 200px);
        width: 60%;
        margin: auto;
        flex-direction: column
    }
    .title {
        color: #6db8d2;
    }
    .user-details-1,.user-details-2{
        flex: 1;
    }
    .user-details-container{
        width: 60%;
        font-size: 20px;
        display: flex;
    }
    .user-details-1{
        width: 40%;
    }
    .play-button{
        margin: 25px;
    }

</style>


