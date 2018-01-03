import axios from 'axios'
import CloudinaryService from '../services/CloudinaryService'

const REGISTER_USER_URL = 'http://localhost:3003/data/user'

function registerUser(user) {
    return new Promise ((resolve,reject) => {
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
    })
    
}

function loginUser(userObj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(userObj) }, 300)
    })
}

export default {
    registerUser,
    loginUser
}