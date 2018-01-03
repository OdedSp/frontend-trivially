<template>
    <div class="trivia-scoreboard">

<!-- TODO: make player-stats component to avoid all of this repetition -->
        <div class="player myself">
            <div class="static-info">
                <h3 v-if="user">{{user.name}}</h3>
                <!-- <img src="{{user.avatar}}" alt="user avatar"> -->
            </div>
            <div class="live-score">
                <h2>
                    {{totalPts.userTotal}}
                    <transition enter-active-class="animated flash"
                                leave-active-class="animated fadeOut">
                        <span v-if="userRoundPts" class="round-score">  +{{userRoundPts}}</span>
                    </transition>
                </h2>
            </div>
        </div>

        <div class="player rival">
            <div class="live-score">
                <h2>
                    <transition enter-active-class="animated flash"
                                leave-active-class="animated fadeOut">
                        <span v-if="rivalRoundPts" class="round-score">{{rivalRoundPts}}+  </span>
                    </transition>
                    {{totalPts.rivalTotal}}
                </h2>
            </div>
            <div class="static-info">
                <h3>Rival</h3>
                <!-- <h3>{{rival.name}}</h3> -->
                <!-- <img src="{{rival.avatar}}" alt="user avatar"> -->
            </div>
        </div>

    </div>
</template>

<script>
//********** all of this needs a do over. Big jif *************/

import { mapGetters } from 'vuex'

export default {
    props: ['user', 'rival', 'currRound', 'nextRound'],
    computed: {
        ...mapGetters([
            'totalPts'
        ])
    },
    data() {
        return {
            userRoundPts: null,
            rivalRoundPts: null,
            userRoundPtsShown: false,
            rivalRoundPtsShown: false
        }
    },
    watch: {
        currRound() {
            if (!this.userRoundPtsShown && this.currRound.userPts) {
                this.userRoundPtsShown = true
                this.userRoundPts = this.currRound.userPts
                setTimeout(_=> this.userRoundPts = null, 2000)
            }
            if (!this.rivalRoundPtsShown && this.currRound.rivalPts) {
                this.rivalRoundPtsShown = true
                this.rivalRoundPts = this.currRound.rivalPts
                setTimeout(_=> this.rivalRoundPts = null, 2000)
            }
        },
        nextRound() {
            this.userRoundPtsShown = false
            this.rivalRoundPtsShown = false
        }
    }
}
</script>

<style lang="scss">
.trivia-scoreboard {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    .player {
        font-size: 1.3em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div:not(:last-child) {
            margin-right: .5rem;
        }
        h2, h3 {
            font-weight: 500;
        }
        .live-score {
            color: #00d7bb;
        }
        .round-score {
            font-size: 80%;
        }

    }
}

</style>
