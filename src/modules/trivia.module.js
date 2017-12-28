import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER } from '../services/BusService'

// export const SET_GAME_ON = 'trivia/setGameOn'

const state = {
    quest: null,
    userPts: 0,
    answerIdx: null,
    rivalAnswerIdx: null,
    rivalPts: 0,
    gameFinished: false,

    userTotalPts: 0,
    rivalTotalPts: 0

    // currQuest: null,
    // userScore: 0,
    // oppScore: 0,
    // isGameOn: false,
    // connect: false,
    // //להעביר להערה
    // questions: TriviaService.getMock().slice(10,15),
}
const mutations = {
    SOCKET_GAMEON(state) {

    },
    SOCKET_NEXTROUND(state, quest) {
        state.gameFinished = false
        state.quest = quest
        state.userPts = 0
        state.answerIdx = null
        state.rivalAnswerIdx = null
        state.rivalPts = 0  
    },
    SOCKET_ANSWERPROCESSED(state, { answerIdx, points }) {
        console.log('entered answerProcced mutation')
        state.answerIdx = answerIdx
        state.userPts = points
        state.userTotalPts += points
        if (points) EventBus.$emit(RIGHT_ANSWER)
    },
    SOCKET_RIVALANSWER(state, { answerIdx, points }) {
        state.rivalAnswerIdx = answerIdx
        state.rivalPts = points
        state.rivalTotalPts += points
    },
    SOCKET_GAMECOMPLETED(state) {
        state.gameFinished = true
        state.quest = null
    }
}
const actions = {}

const getters = {
    currRound(state) {
        return {
            quest: state.quest,
            userPts: state.userPts,
            answerIdx: state.answerIdx,
            rivalAnswerIdx: state.rivalAnswerIdx,
            rivalPts: state.rivalPts,
        }
    },
    quest(state) {
        return state.quest
    },
    gameFinished() {
        return state.gameFinished
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}