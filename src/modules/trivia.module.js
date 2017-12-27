import TriviaService from '../services/TriviaService'

export const SET_GAME_ON = 'trivia/setGameOn'

const state = {
    currQuest: null,
    userScore: 0,
    oppScore: 0,
    isGameOn: false,
    connect: false,
    //להעביר להערה
    questions: TriviaService.getMock().slice(10,15),
}

const mutations = {
    SOCKET_CONNECT: (state,  status ) => {
        console.log('socket connected');
        
        state.connect = true;
    },
}

const actions = {
    // socket_joinGameRoom: (context) => {
    //     context.dispatch('joinGameRoom')
    //     // context.commit('waitingForOpponent')
    // }
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