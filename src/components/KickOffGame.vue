<template>
<section class="kick-off">

    <div class="player user" :class="{blend}">
        <div class="username" :class="{ disappear }">{{user.username}}</div>
        <div class="details">
            <div class="avatar">
                <div class="dynamic-avatar" ref="userAvatar" :style="userAvatarStyle">
                    <img :src="user.avatar" :class="{'max-none': maxNone}" ref="userAvImg" />
                </div>
            </div>
            <div v-if="user.statObj" class="stats" :class="{ disappear }">
                <div class="stat xp">
                    {{user.statObj.totalPts}} XP
                </div>
                <div class="stat win-rate">
                    {{getWinRate(user.statObj)}}% Win Rate
                </div>
                <div class="stat correct-rate">
                    {{getCorrectRate(user.statObj)}}% Correct Rate
                </div>
            </div>
            <div v-else class="stats" :class="{ disappear }">
                No statitstics<br /> to show
            </div>
        </div>
    </div>

    <div :class="{ disappear }"> VS. </div>

    <div class="player rival" :class="{blend}">
        <div class="username" :class="{ disappear }">{{rival.username}}</div>
        <div class="details">
            <div v-if="rival.statObj" class="stats" :class="{ disappear }">
                <div class="stat xp">
                    {{rival.statObj.totalPts}} XP
                </div>
                <div class="stat win-rate">
                    {{getWinRate(rival.statObj)}}% Win Rate
                </div>
                <div class="stat correct-rate">
                    {{getCorrectRate(rival.statObj)}}% Correct Rate
                </div>
            </div>
            <div v-else class="stats" :class="{ disappear }">
                No statitstics<br /> to show
            </div>
            <div class="avatar">
                <div class="dynamic-avatar" ref="rivalAvatar" :style="rivalAvatarStyle">
                    <img :src="rival.avatar" :class="{'max-none': maxNone}" ref="rivalAvImg" />
                </div>
            </div>
        </div>
    </div>

</section>
</template>

<script>
export default {
    props: ['user', 'rival'],
    data() {
        return {
            userAvatarStyle: null,
            rivalAvatarStyle: null,
            disappear: false,
            maxNone: false,
            blend: false
        }
    },
    methods: {
        getWinRate(statObj) {
            let divisor = statObj.totalGames || 1
            let winRate = 100 * statObj.gamesWon / divisor
            return Math.round(winRate)
        },
        getCorrectRate(statObj) {
            let divisor = statObj.totalQuestions || 1
            let correctRate = 100 * statObj.correctAnswers / divisor
            return Math.round(correctRate)
        },
        setParentDimensions(el) {
            el.style.width = el.offsetWidth + 'px'
            el.style.height = el.offsetHeight + 'px'
        },
        kickOff() {
            var elUserAv = this.$refs.userAvatar
            var elRivalAv = this.$refs.rivalAvatar
            this.userAvatarStyle = `position: absolute; top: calc(50vh - 1.75em);
                                    left: calc(${elUserAv.offsetLeft + elUserAv.offsetWidth}px - 3.5em);
                                    height: 3.5em; width: 3.5em;
                                    border-radius: 50%; transform: rotateX(720deg) rotateY(0);`
            this.rivalAvatarStyle = `position: absolute; top: calc(50vh - 1.75em);
                                    right: calc(100vw - ${elRivalAv.offsetLeft}px - 3.5em);
                                    height: 3.5em; width: 3.5em;
                                    border-radius: 50%; transform: rotateX(-720deg) rotateY(0)`
            this.disappear = true
            this.blend = true
            setTimeout(_=> {
                this.userAvatarStyle = `position: absolute; top: 103px; left: 1rem;
                                        height: 2.5em; width: 2.5em; transform: rotateX(720deg) rotateY(1080deg);
                                        border-radius: 50%; border: 3px solid var(--player-color)`
                this.rivalAvatarStyle = `position: absolute; top: 103px; right: 1rem;
                                        height: 2.5em; width: 2.5em; transform: rotateX(-720deg) rotateY(-1080deg);
                                        border-radius: 50%; border: 3px solid var(--rival-color)`
                setTimeout(_=> this.$emit('kickedOff'), 1500)
            }, 1500)
        }
    },
    mounted() {
        var elUserAv = this.$refs.userAvatar
        var elUserAvImg = this.$refs.userAvImg
        var elRivalAv = this.$refs.rivalAvatar
        var elRivalAvImg = this.$refs.rivalAvImg
        setTimeout(_=> {
            this.setParentDimensions(elUserAv.parentNode)
            this.setParentDimensions(elRivalAv.parentNode)
            this.userAvatarStyle = `position: absolute; top: ${elUserAv.offsetTop}px;
                                    left: ${elUserAv.offsetLeft}px; height: ${elUserAvImg.height + 6}px;
                                    width: ${elUserAvImg.width + 6}px`
            this.rivalAvatarStyle = `position: absolute; top: ${elRivalAv.offsetTop}px;
                                    right: calc(100vw - ${elRivalAv.offsetLeft + elRivalAv.offsetWidth}px);
                                    height: ${elRivalAvImg.height + 6}px; width: ${elRivalAvImg.width + 6}px`
            this.maxNone = true
        }, 100)
        setTimeout(this.kickOff, 3000)
    }
}
</script>

<style lang="scss">

.kick-off {
    // * {outline: 1px solid hotpink;}
    font-weight: 500;
    width: fit-content;
    margin: auto;
    > div:not(:last-child) {
        margin-bottom: 2em;
    }
    .disappear {
        transition: all 2s;
        opacity: 0;
    }
    .details {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .player {
        background-color: #000945;
        padding: 10px;
        border-radius: 10px;
        transition: background-color 2s, box-shadow .5s;
        .username {
            font-size: 160%;
        }
        &.user {
            color: var(--player-color);
            box-shadow: -2px -2px 7px 2px;
        }
        &.rival {
            color: var(--rival-color);
            box-shadow: 2px 2px 7px 2px;
        }
        &.blend {
            background-color: var(--main-bg-color);
            box-shadow: 0 0 0 0;
        }
        .avatar {
            max-width: 40%;
        }
        .dynamic-avatar {
            font-size: 1.3em;
            border-radius: 0;
            border: 3px solid transparent;
            transition: all 1.5s;
            overflow: hidden;
            img {
                max-height: 100%;
                width: auto;
                // max-width: none;
                &.max-none {
                    max-width: none;
                }
            }
        }
    }
    .stats {
        font-size: 120%;
        text-align: left;
        padding: 5px;
        .stat:not(:last-of-type) {
            margin-bottom: 5px;
        }
    }
}

</style>
