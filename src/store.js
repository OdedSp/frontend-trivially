import Vuex from 'vuex'
import userModule from './modules/user.module'
import triviaModule from './modules/trivia.module'

const store = new Vuex.Store({
    modules: {
        userModule,
        triviaModule
    },
    strict: true
})

export default store