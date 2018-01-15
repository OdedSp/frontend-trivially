
export const USER = 'currUser'
export const LOGGED_IN = 'loggedIn'

const load = key => {
    return JSON.parse(localStorage.getItem(key))
}

const save = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

const remove = key => {
    localStorage.removeItem(key)
}

export default {
    load,
    save,
    remove
}
