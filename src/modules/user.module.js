import UserService from '../services/UserService'

export const REGISTER_USER = 'user/REGISTER_USER'

const state = {
    currUser: null,
    userIsLoggedIn: false
    // currUser: {name: 'ninabombina'} // for testing purposes
}

const mutations = {
    setUser(state, user) {
        state.currUser = user
    },
    setUserLoggedIn (state){
        state.userIsLoggedIn = true
    }
}


const actions = {
    [REGISTER_USER](store, { user }) {
        UserService.registerUser(user)
        .then (( { data } ) => {
            store.commit('setUser', data)
            store.commit('setUserLoggedIn')
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
    },
    userIsLoggedIn(state){
        return state.userIsLoggedIn
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}