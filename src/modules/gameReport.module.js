import TriviaService from '../services/TriviaService'

const resetRound = (state, quest = null) => {
    state.userPts = 0
    state.rivalPts = 0
    state.answerIdx = null
    state.rivalAnswerIdx = null
    state.quest = quest || null
}

const state = {
    reports: [],
    quest: null,

    userPts: 0,
    rivalPts: 0,
    answerIdx: null, //change to answerId
    rivalAnswerIdx: null //change to answerId
}

const mutations = {
    SOCKET_FIRSTROUND(state, { quest }) {
        state.reports = []
        resetRound(state, quest)
    },
    SOCKET_NEXTROUND(state, quest){
        state.reports.push({
            quest: state.quest,
            userPts: state.userPts,
            rivalPts: state.rivalPts,
            answerIdx: state.answerIdx,
            rivalAnswerIdx: state.rivalAnswerIdx
        })
        resetRound(state, quest)
        // state.userPts = 0
        // state.rivalPts = 0
        // state.answerIdx = null
        // state.rivalAnswerIdx = null
        // state.quest = quest
    },
    SOCKET_ANSWERPROCESSED(state, { answerId, points }) {
        state.answerId = answerId
        state.userPts = points
    },
    SOCKET_RIVALANSWER(state, { answerId, points }) {
        state.rivalAnswerId = answerId
        state.rivalPts = points
    },
    SOCKET_GAMECOMPLETED(state) {
        state.reports.push({
            quest: state.quest,
            userPts: state.userPts,
            rivalPts: state.rivalPts,
            answerIdx: state.answerId,
            rivalAnswerIdx: state.rivalAnswerId
        })
        
        resetRound(state)
    }
    
}

const actions = {}

const getters = {
    report: state => {
        return state.reports
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}