import UserService from '../services/UserService'

export const REGISTER_USER = 'user/REGISTER_USER'
export const LOGIN_USER = 'user/LOGIN_USER'
export const LOGOUT_USER = 'user/LOGOUT_USER'

const state = {
    currUser: null,
    userIsLoggedIn: false
}

const mutations = {
    setUser(state, user) {
        state.currUser = user
    },
    setUserLoggedIn (state){
        state.userIsLoggedIn = true
    },
    setUserLogOut (state){
        state.userIsLoggedIn = false
        state.currUser = null
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
    },
    [LOGOUT_USER](store){
        console.log('logged out')
        store.commit('setUserLogOut')
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