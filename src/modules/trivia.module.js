import axios from 'axios'

import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER, RIVAL_DISCONNECTED } from '../services/BusService'

export const ROUND_START_TIME = 'trivia/setRoundStartTime'
export const GAME_COMPLETED = 'trivia/handleGameCompleted'
export const RIVAL_LEFT = 'trivia/handleRivalLeft'
// export const ANSWER_TIME = 'trivia/getAnswerTime'

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
    rivalAnswerTime: null,
    rivalPts: 0,
    answerTime: null,
    correctAnswerId: null,

    userTotalPts: 0,

    rival: null,
    rivalTotalPts: 0,
    winner: null,
    
    gameStartTime: null,
    
    waitingForRival: false
    
    // userName: null,
}
const mutations = {
    SOCKET_WAITINGFORRIVAL(state) {
        state.waitingForRival = true
    },
    SOCKET_FIRSTROUND(state, { quest, rival, createdAt }) {
        console.log({rival})
        state.roundReports = []
        state.waitingForRival = false
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = createdAt
        state.rival = rival

        resetRound(state, quest)
    },
    SOCKET_NEXTROUND(state, quest) {
        pushRoundReport(state)
        resetRound(state, quest)
    },
    SOCKET_ANSWERPROCESSED(state, { answerId, points, answerTime }) {
        state.userPts = points
        state.userTotalPts += points
        state.answerId = answerId
        state.answerTime = answerTime
        if (points) EventBus.$emit(RIGHT_ANSWER)
    },
    SOCKET_RIVALANSWER(state, { answerId, points, answerTime }) {
        state.rivalPts = points
        state.rivalTotalPts += points
        state.rivalAnswerId = answerId
        state.rivalAnswerTime = answerTime
    },
    SOCKET_ANSWERWAS(state, answerId) {
        state.correctAnswerId = answerId
    },
    [ROUND_START_TIME](state, { startTime }) {
        state.roundStartTime = startTime
    },
    [GAME_COMPLETED](state) {
        if (state.userTotalPts > state.rivalTotalPts) {
            state.winner = 'user'
        } else if (state.userTotalPts < state.rivalTotalPts) {
            state.winner = 'rival'
        } else {
            state.winner = 'draw'
        }
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
    // [ANSWER_TIME](state, { answerTime }) {
    //     state.answerTime = answerTime
    //     console.log(state.answerTime);
    // }
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
    rival(state) {
        return state.rival
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
    },
    report: state => {
        return state.roundReports
    },
    result: state => {
        var totalUserPts = state.roundReports.reduce((acc, report) => {
            return acc + report.userPts
        }, 0);
        var totalRivalPts = state.roundReports.reduce((acc, report) => {
            return acc + report.rivalPts
        }, 0);
        return {
            winner: state.winner,
            userPts: totalUserPts,
            rivalPts: totalRivalPts
        }
    }
}

function pushRoundReport(state) {
    state.roundReports.push({
        quest: state.quest,
        answerId: state.answerId,
        answerTime: state.answerTime,
        userPts: state.userPts,
        rivalAnswerId: state.rivalAnswerId,
        rivalAnswerTime: state.rivalAnswerTime,
        rivalPts: state.rivalPts,
        correctAnswerId: state.correctAnswerId
    })
}

function resetRound(state, quest=null) {
    state.quest = quest
    state.roundStartTime = null
    state.answerId = null
    state.answerTime = null
    state.userPts = 0
    state.rivalAnswerId = null
    state.rivalAnswerTime = null
    state.rivalPts = 0
    state.correctAnswerId = null
}

export default {
    state,
    mutations,
    actions,
    getters
}
