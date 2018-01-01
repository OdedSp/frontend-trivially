import axios from 'axios'

import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER } from '../services/BusService'

export const ROUND_START_TIME = 'trivia/setRoundStartTime'
export const SET_ANSWER_ID = 'trivia/setAnswerId'
export const GAME_COMPLETED = 'trivia/handleGameCompleted'

const BASE_ROUTE = '//localhost:3003/data'

const state = {
    roundReports: [],

    quest: null,
    roundStartTime: null,
    userPts: 0,
    answerId: null,
    rivalAnswerId: null,
    rivalPts: 0,
    correctAnswerId: null,

    userTotalPts: 0,
    rivalTotalPts: 0,
    rivalName: null,
    rivalAvatar: null,

    gameStartTime: null

}
const mutations = {
    SOCKET_WAITINGFOROPPONENT(state) {
        console.log('Waiting for opponent')
    },
    SOCKET_FIRSTROUND(state, { quest, rival, createdAt }) {
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = createdAt
        state.rivalName = rival.name // not in use at the moment
        state.rivalAvatar = rival.avatar // not in use at the moment

        resetRound(state, quest)
    },
    SOCKET_NEXTROUND(state, quest) {
        pushRoundReport(state)
        resetRound(state, quest)
    },
    SOCKET_ANSWERPROCESSED(state, points) {
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
    [ROUND_START_TIME](state, { startTime }) {
        state.roundStartTime = startTime
    },
    [GAME_COMPLETED](state) {
        if (state.quest) pushRoundReport(state)
        state.quest = null
    },
    [SET_ANSWER_ID](state, { answerId }) {
        state.answerId = answerId
    }
}
const actions = {
    socket_gameCompleted({state, commit, getters}) {
        commit(GAME_COMPLETED)
        var user = getters.currUser
        if (!user || user.name.toLowerCase() === 'guest') return
        var statObj = {
            username: user.name,
            game_results: {
                game_time: state.gameStartTime,
                win: state.userTotalPts >= state.rivalTotalPts,
                totalQuestions: state.roundReports.length,
                correct_questions: state.roundReports.filter(({ userPts }) => !!userPts).length
            } 
        }
        axios.post(`${BASE_ROUTE}/statistic`, statObj)
        .catch(err => console.warn('An error occured while trying to update last game\'s user stats:', err))
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
    // rival(state) {
    //     return {
    //         name: state.rivalName,
    //         avatar: state.rivalAvatar
    //     }
    // }
}

function pushRoundReport(state) {
    state.roundReports.push({
        quest: state.quest,
        userPts: state.userPts,
        rivalPts: state.rivalPts,
        answerId: state.answerId,
        rivalAnswerId: state.rivalAnswerId
    })
}

function resetRound(state, quest=null) {
    state.quest = quest
    state.roundStartTime = null
    state.userPts = 0
    state.answerId = null
    state.rivalAnswerId = null
    state.rivalPts = 0
    state.correctAnswerId = null
}

export default {
    state,
    mutations,
    actions,
    getters
}
