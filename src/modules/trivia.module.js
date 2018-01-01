import axios from 'axios'

import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER } from '../services/BusService'

export const SET_ROUND_START = 'trivia/setRoundStartTime'
export const SET_ANSWER_ID = 'trivia/setAnswerId'
export const GAME_COMPLETED = 'trivia/handleGameCompleted'

const state = {
    quest: null,
    roundStartTime: null,
    userPts: 0,
    answerId: null,
    rivalAnswerId: null,
    rivalPts: 0,
    correctAnswerId: null,

    userTotalPts: 0,
    rivalTotalPts: 0,
    // rivalName: null,
    // rivalAvatar: null

    gameStartTime: null

}
const mutations = {
    SOCKET_WAITINGFOROPPONENT(state) {
        console.log('Waiting for opponent')
    },
    SOCKET_FIRSTROUND(state, { quest, rival, startTime}) {
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = startTime

        state.quest = quest
        state.roundStartTime = null
        state.userPts = 0
        state.answerId = null
        state.rivalAnswerId = null
        state.rivalPts = 0
        state.correctAnswerId = null
        // state.rivalName = rival.name
        // state.rivalAvatar = rival.avatar
    },
    SOCKET_NEXTROUND(state, quest) {
        state.quest = quest
        state.roundStartTime = null
        state.userPts = 0
        state.answerId = null
        state.rivalAnswerId = null
        state.rivalPts = 0
        state.correctAnswerId = null
    },
    // SOCKET_ANSWERPROCESSED(state, { answerIdx, points }) {
    //     console.log('entered answerProccessed mutation')
    //     state.answerIdx = answerIdx
    //     state.userPts = points
    //     state.userTotalPts += points
    //     if (points) EventBus.$emit(RIGHT_ANSWER)
    // },
    SOCKET_ANSWERPROCESSED(state, points) {
        console.log('entered answerProcced mutation')
        state.userPts = points
        state.userTotalPts += points
        if (points) EventBus.$emit(RIGHT_ANSWER)
    },
    SOCKET_RIVALANSWER(state, { answerId, points }) {
        state.rivalAnswerId = answerId
        state.rivalPts = points
        state.rivalTotalPts += points
    },
    SOCKET_ANSWERWAS(state, answerId) {
        console.log('entered answerWas', {answerId})
        state.correctAnswerId = answerId
    },
    // SOCKET_GAMECOMPLETED(state) {
    //     state.quest = null
    // },
    [SET_ROUND_START](state, { startTime }) {
        state.roundStartTime = startTime
    },
    [GAME_COMPLETED](state) {
        state.quest = null
        state.startTime = null
    },
    [SET_ANSWER_ID](state, { answerId }) {
        state.answerId = answerId
    }
}
const actions = {
    socket_gameCompleted({commit, getters}) {
        commit(GAME_COMPLETED)
        var user = getters.currUser
        if (!user || user.name.toLowerCase() === 'guest') return

    }
}

const getters = {
    currRound(state) {
        var rivalAnswerId = null
        var rivalPts = null
        if (state.answerId) {
            rivalAnswerId = state.rivalAnswerId
            rivalPts = state.rivalPts
        }
        return {
            userPts: state.userPts,
            answerId: state.answerId,
            rivalAnswerId,
            rivalPts,
        }
    },
    quest(state) {
        return state.quest
    },
    roundStartTime(state) {
        return state.roundStartTime
    },
    totalPts(state) {
        var rivalTotal = state.rivalTotalPts
        if (!state.answerId) rivalTotal -= state.rivalPts
        return {
            userTotal: state.userTotalPts,
            rivalTotal
        }
    }
    // userScore(state) {
    //     return user.score
    // },
    // rival(state) {
    //     return {
    //         name: state.rivalName,
    //         avatar: state.rivalAvatar
    //     }
    // }
}


export default {
    state,
    mutations,
    actions,
    getters
}