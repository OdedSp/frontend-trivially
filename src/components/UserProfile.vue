<template>
    <div class="page-container">
      <h2>Profile</h2>
      <img :src="avatar" />
      <h4>{{username}}</h4>
    </div>
</template>
<script>
import mapGetters from 'vuex'

export default {
    name: 'UserProfile',
    data(){
        return {
            avatar: '' || this.$store.getters.currUser.avatar,
            username: '' || this.$store.getters.currUser.username        }
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

</style>


