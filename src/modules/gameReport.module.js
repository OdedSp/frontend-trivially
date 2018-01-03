import TriviaService from '../services/TriviaService'

export const ADD_REPORT = 'gameReport/addRoundReport'

const state = {
    reports: [],
    quest: null,

    userPts: 0,
    rivalPts: 0,
    answerIdx: null,
    rivalAnswerIdx: null
}

const mutations = {
    [ADD_REPORT](state, reportObj){
        state.reports.push(reportObj)
        console.log(state.reports);
    },

    SOCKET_NEXTROUND(state, quest){
        if (state.quest) {
            state.reports.push({
                quest: state.quest,
                userPts: state.userPts,
                rivalPts: state.rivalPts,
                answerIdx: state.answerIdx,
                rivalAnswerIdx: state.rivalAnswerIdx
            }) 
        }
        state.userPts = 0
        state.rivalPts = 0
        state.answerIdx = null
        state.rivalAnswerIdx = null
        state.quest = quest
    },
    SOCKET_ANSWERPROCESSED(state, { answerIdx, points }) {
        state.answerIdx = answerIdx
        state.userPts = points
    },
    SOCKET_RIVALANSWER(state, { answerIdx, points }) {
        state.rivalAnswerIdx = answerIdx
        state.rivalPts = points
    }
}

const actions = {
    [ADD_REPORT]({commit}, {report}) {
        // TriviaService.sendRoundReport(reportObj)
        commit(ADD_REPORT, report)
    }
}

const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}