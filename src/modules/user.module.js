import UserService from '../services/UserService'
import StorageService, { USER, LOGGED_IN } from '../services/StorageService'

export const REGISTER_USER = 'user/registerUser'
export const LOGIN_USER = 'user/loginUser'
export const LOGOUT_USER = 'user/logoutUser'
export const SET_USER_STAT = 'user/setUserStatObj'

const state = {
    currUser: StorageService.load(USER),
    userIsLoggedIn: !!this.currUser
}

const mutations = {
    setUser(state, user) {
        state.currUser = user
    },
    setUserLoggedIn(state) {
        state.userIsLoggedIn = true
    },
    setUserLogOut(state) {
        state.userIsLoggedIn = false
        state.currUser = null
    },
    [SET_USER_STAT](state, { statObj }) {
        if (!statObj) return
        state.currUser.statObj = statObj
        StorageService.save(USER, state.currUser)
    }
}


const actions = {
    [REGISTER_USER]({ dispatch, commit }, { user }) {
        return UserService.registerUser(user)
        .then (( { data } ) => {
            var currUser = {
                ...data,
                statObj: null
            }
            commit('setUser', currUser)
            StorageService.save(USER, currUser)
            commit('setUserLoggedIn')
        })
        // .catch (err => {
        //     console.log(err);
        //     commit('setUser', {username: 'guest'})
        // })
    },
    [LOGIN_USER]({ commit }, { user }){
        return UserService.loginUser(user)
        .then(( { data } ) => {
            var currUser = {
                ...data.user.value,
                statObj: null
            }
            commit('setUser', currUser)
            StorageService.save(USER, currUser)
            commit('setUserLoggedIn')
        })
        // .catch (err => {
        //     console.log(err)
        //     commit('setUser', {username: 'guest'})
        // })
    },
    [LOGOUT_USER](store){
        console.log('logged out')
        StorageService.remove(USER)
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
