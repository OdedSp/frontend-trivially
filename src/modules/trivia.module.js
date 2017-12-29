import TriviaService from '../services/TriviaService'
import EventBus, { RIGHT_ANSWER } from '../services/BusService'

export const SET_ANSWER_ID = 'trivia/setAnswerId'

const state = {

    quest: null,
    userPts: 0,
    answerId: null,
    rivalAnswerId: null,
    rivalPts: 0,
    correctAnswerId: null,

    userTotalPts: 0,
    rivalTotalPts: 0,
    // rivalName: null,
    // rivalAvatar: null

    gameCount: 0

    // currQuest: null,
    // userScore: 0,
    // oppScore: 0,
    // isGameOn: false,
    // connect: false,
    // //להעביר להערה
    // questions: TriviaService.getMock().slice(10,15),
}
const mutations = {
    SOCKET_WAITINGFOROPPONENT(state) {
        console.log('Waiting for opponent')
    },
    SOCKET_FIRSTROUND(state, { quest, rival}) {
        state.quest = quest
        state.userPts = 0
        state.answerId = null
        state.rivalAnswerId = null
        state.rivalPts = 0
        state.correctAnswerId = null
        state.userTotalPts = 0
        state.rivalTotalPts = 0
        // state.rivalName = rival.name
        // state.rivalAvatar = rival.avatar
    },
    SOCKET_NEXTROUND(state, quest) {
        state.quest = quest
        state.userPts = 0
        state.answerId = null
        state.rivalAnswerId = null
        state.rivalPts = 0
        state.correctAnswerId = null
    },
    // SOCKET_ANSWERPROCESSED(state, { answerIdx, points }) {
    //     console.log('entered answerProccessed mutation')
    //     state.answerIdx = answerIdx
    //     state.userPts = points
    //     state.userTotalPts += points
    //     if (points) EventBus.$emit(RIGHT_ANSWER)
    // },
    SOCKET_ANSWERPROCESSED(state, points) {
        console.log('entered answerProcced mutation')
        state.userPts = points
        state.userTotalPts += points
        if (points) EventBus.$emit(RIGHT_ANSWER)
    },
    SOCKET_RIVALANSWER(state, { answerId, points }) {
        state.rivalAnswerId = answerId
        state.rivalPts = points
        state.rivalTotalPts += points
    },
    SOCKET_ANSWERWAS(state, answerId) {
        console.log('entered answerWas', {answerId})
        state.correctAnswerId = answerId
    },
    SOCKET_GAMECOMPLETED(state) {
        state.quest = null
    },
    [SET_ANSWER_ID](state, { answerId }) {
        state.answerId = answerId
    }
}
const actions = {

}

const getters = {
    currRound(state) {
        return {
            // quest: state.quest,
            userPts: state.userPts,
            answerId: state.answerId,
            rivalAnswerId: state.rivalAnswerId,
            rivalPts: state.rivalPts,
        }
    },
    quest(state) {
        return state.quest
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}