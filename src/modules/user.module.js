import UserService from '../services/UserService'

export const REGISTER_USER = 'user/REGISTER_USER'
export const LOGIN_USER = 'user/LOGIN_USER'

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
            store.commit('setUser', {username: 'guest'})
        })
    },
    [LOGIN_USER](store, { user }){
        UserService.loginUser(user)
        .then(( { data } ) => {
            store.commit('setUser', data.user.value)
            store.commit('setUserLoggedIn')
        })
        .catch (err => {
            console.log(err)
            store.commit('setUser', {username: 'guest'})
        })
    }
}

const getters = {
    currUser(state){
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