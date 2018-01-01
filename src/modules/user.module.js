import UserService from '../services/UserService'

const state = {
    currUser: null
    // currUser: {name: 'ninabombina'} // for testing purposes
}

const mutations = {
    setUser(state, user) {
        state.currUser = user
    }
}

const actions = {
    addUser(store, userObj) {
        return UserService.newUser(userObj)
        .then (user => {
            store.commit('setUser', user)
        })
        .catch (err => {
            console.log(err);
            store.commit('setUser', {name: 'guest'})
        })
    },
    loginUser(store, userObj) {
        return UserService.loginUser(userObj)
        .then (user => {
            store.commit('setUser', user)
        })
        .catch (err => {
            console.log(err);
            store.commit('setUser', {name: 'guest'})
        })
    }
}

const getters = {
    currUser: state => {
        return state.currUser
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}