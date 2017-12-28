import Vuex from 'vuex'
import userModule from './modules/user.module'
import triviaModule from './modules/trivia.module'
import gameReportModule from './modules/gameReport.module'

const store = new Vuex.Store({
    modules: {
        userModule,
        triviaModule,
        gameReportModule
    },
    strict: true
})

export default store