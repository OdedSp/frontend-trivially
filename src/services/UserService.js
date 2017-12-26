function newUser(userObj) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve(userObj)}, 300)
    })
}

function loginUser(userObj) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve(userObj)}, 300)
    })
}

export default {
    newUser,
    loginUser
}