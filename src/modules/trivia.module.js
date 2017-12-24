import { getMock } from '../services/QuestService'

const state = {
    questions: getMock()
}

const mutations = {}

const actions = {}

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