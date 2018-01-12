import axios from 'axios'

import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER, RIVAL_DISCONNECTED, GAME_WON } from '../services/BusService'

import { SET_USER_STAT } from './user.module'

export const RESET_GAME = 'trivia/resetGame'
export const ROUND_START_TIME = 'trivia/setRoundStartTime'
export const FIRST_ROUND = 'trivia/firstRound'
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
    // userStatObj: null,

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
    [FIRST_ROUND](state, { quest, rival, createdAt }) {
        console.log({rival})
        state.roundReports = []
        state.waitingForRival = false
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = createdAt
        state.rival = rival

        TriviaService.shuffleAnswers(quest.answers)
        TriviaService.resetRound(state, quest)
    },
    SOCKET_NEXTROUND(state, quest) {
        TriviaService.pushRoundReport(state)
        TriviaService.shuffleAnswers(quest.answers)
        TriviaService.resetRound(state, quest)
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
    [RESET_GAME](state) {
        state.rival = null
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        state.gameStartTime = null
        state.winner = null
    },
    [ROUND_START_TIME](state, { startTime }) {
        state.roundStartTime = startTime
    },
    [GAME_COMPLETED](state) {
        if (state.rival && state.userTotalPts > state.rivalTotalPts) {
            state.winner = 'user'
            EventBus.$emit(GAME_WON)
        } else if (state.userTotalPts < state.rivalTotalPts) {
            state.winner = 'rival'
        } else {
            state.winner = 'draw'
        }
        if (state.quest) TriviaService.pushRoundReport(state)
        state.quest = null
        // state.rival = null
        // state.userTotalPts = 0
        // state.rivalTotalPts = 0
        // state.gameStartTime = null
    },
    [RIVAL_LEFT](state) {
        state.rivalTotalPts = 0
        state.rival = null
        state.quest = null
        state.waitingForRival = false
    }
    // [ANSWER_TIME](state, { answerTime }) {
    //     state.answerTime = answerTime
    //     console.log(state.answerTime);
    // }
}
const actions = {
    socket_firstRound({ state, commit }, payload) {
        commit({ type: SET_USER_STAT, statObj: payload.player.statObj })
        commit({ type: FIRST_ROUND, ...payload })
    },
    socket_gameCompleted({ state, commit, getters }) {
        var win = state.userTotalPts > state.rivalTotalPts
        var gameStartTime = state.gameStartTime
        var pts = state.userTotalPts
        commit(GAME_COMPLETED)
        var user = getters.currUser
        if (!user || !user._id) return
        var gameStat = {
            userId: user._id,
            gameResults: {
                gameStartTime,
                win,
                totalQuestions: state.roundReports.length,
                correctQuestions: state.roundReports.filter(({ userPts }) => !!userPts).length,
                pts
            } 
        }
        axios.post(`${BASE_ROUTE}/statistic`, gameStat)
        .catch(err => console.warn('An error occured while trying to update last game\'s user stats:', err))
    },
    socket_rivalLeft({ dispatch, commit }) {
        commit(RIVAL_LEFT)
        EventBus.$emit(RIVAL_DISCONNECTED)
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

export default {
    state,
    mutations,
    actions,
    getters
}
