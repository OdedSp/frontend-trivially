<template>
  <div>
    <article class="number" :title="userCount+' users are currently online'">
        <icon name="user-times" scale="1.85"/>
        {{userCount}} 
    </article>
  </div>
</template>

<script>
export default {
    computed: {
        userCount() {
            return this.$store.state.userCount
        }
    }
}
</script>

<style lang="scss" scoped>
.user-count {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0
}
.number {
    height: 27px;
    width: 27px;
    margin: 2px 0;
    background: inherit;
    position: relative;
    z-index: 10;
}
</style>
