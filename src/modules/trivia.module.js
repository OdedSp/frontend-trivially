import axios from 'axios'

import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER, RIVAL_DISCONNECTED } from '../services/BusService'

export const ROUND_START_TIME = 'trivia/setRoundStartTime'
export const GAME_COMPLETED = 'trivia/handleGameCompleted'
export const RIVAL_LEFT = 'trivia/handleRivalLeft'

var BASE_ROUTE = '//localhost:3003/data'
if (process.env.NODE_ENV !== 'development') {
    BASE_ROUTE = '/data';
}

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

    gameStartTime: null,

    waitingForRival: false

}
const mutations = {
    SOCKET_WAITINGFORRIVAL(state) {
        state.waitingForRival = true
    },
    SOCKET_FIRSTROUND(state, { quest, rival, createdAt }) {
        state.waitingForRival = false
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = createdAt
        // state.rivalName = rival.name // not in use at the moment
        // state.rivalAvatar = rival.avatar // not in use at the moment

        resetRound(state, quest)
    },
    SOCKET_NEXTROUND(state, quest) {
        pushRoundReport(state)
        resetRound(state, quest)
    },
    SOCKET_ANSWERPROCESSED(state, { answerId, points }) {
        state.userPts = points
        state.userTotalPts += points
        state.answerId = answerId
        if (points) EventBus.$emit(RIGHT_ANSWER)
    },
    SOCKET_RIVALANSWER(state, { answerId, points }) {
        state.rivalAnswerId = answerId
        state.rivalPts = points
        state.rivalTotalPts += points
    },
    SOCKET_ANSWERWAS(state, answerId) {
        console.log({correctAnswerId: answerId})
        state.correctAnswerId = answerId
    },
    [ROUND_START_TIME](state, { startTime }) {
        state.roundStartTime = startTime
    },
    [GAME_COMPLETED](state) {
        if (state.quest) pushRoundReport(state)
        state.quest = null
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = null
    },
    [RIVAL_LEFT](state) {
        state.rivalTotalPts = 0
        state.rivalName = null
        state.rivalAvatar = null
        state.quest = null
    }
}
const actions = {
    socket_gameCompleted({ state, commit, getters }) {
        var win = state.userTotalPts >= state.rivalTotalPts
        var game_time = state.gameStartTime
        commit(GAME_COMPLETED)
        var user = getters.currUser
        if (!user || user.name.toLowerCase() === 'guest') return
        var statObj = {
            username: user.name,
            game_results: {
                game_time,
                win,
                totalQuestions: state.roundReports.length,
                correct_questions: state.roundReports.filter(({ userPts }) => !!userPts).length
            } 
        }
        axios.post(`${BASE_ROUTE}/statistic`, statObj)
        .catch(err => console.warn('An error occured while trying to update last game\'s user stats:', err))
    },
    socket_rivalLeft({ dispatch, commit }) {
        EventBus.$emit(RIVAL_DISCONNECTED)
        commit(RIVAL_LEFT)
        dispatch('socket_gameCompleted')
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
    correctAnswerId(state) {
        if (state.answerId === state.correctAnswerId
            || state.rivalAnswerId === state.correctAnswerId) return null
        return state.correctAnswerId
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
    },
    waitingForRival(state) {
        return state.waitingForRival
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
