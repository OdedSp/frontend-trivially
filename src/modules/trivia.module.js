import TriviaService from '../services/TriviaService'

export const SET_GAME_ON = 'trivia/setGameOn'

const state = {
    questions: TriviaService.getMock().slice(25,30),
    isGameOn: false
}

const mutations = {}

const actions = {
    [SET_GAME_ON](state, boolean) {
        if (boolean){
            
        }
    }
 }

const getters = {
    quest: state => {
        // console.log(state)
        var quests = state.questions
        return quests[Math.floor(Math.random()*quests.length)]
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}