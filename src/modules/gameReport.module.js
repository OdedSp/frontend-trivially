import TriviaService from '../services/TriviaService'

export const ADD_REPORT = 'gameReport/addRoundReport'

const state = {
    reports: []
}

const mutations = {
    [ADD_REPORT](state, reportObj){
        state.reports.push(reportObj)
        console.log(state.reports);
    }
}

const actions = {
    [ADD_REPORT]({commit}, {report}) {
        // TriviaService.sendRoundReport(reportObj)
        commit(ADD_REPORT, report)
    }
}

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