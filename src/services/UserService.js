import axios from 'axios'
import CloudinaryService from '../services/CloudinaryService'

const REGISTER_USER_URL = 'http://localhost:3003/data/user'
const LOGIN_USER_URL = 'http://localhost:3003/login'

function registerUser(user) {
    return new Promise ((resolve,reject) => {
        if (user.avatar){
            CloudinaryService.upload(user.avatar)
            .then((res) => {
              user.avatar = res.data.secure_url
              axios.post(REGISTER_USER_URL, user)
              .then((res) => {
                  resolve(res)
              })
              .catch(err => {
                  reject(err)
              })
            })
            .catch(err => console.log(err))
        } else {
            axios.post(REGISTER_USER_URL, user)
            .then((res) => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        }
    })
    
}

function loginUser(user) {
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_USER_URL, user)
        .then((res) => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default {
    registerUser,
    loginUser
}