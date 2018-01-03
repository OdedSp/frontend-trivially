import axios from 'axios'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/daunij4ze/upload'
const CLOUDINARY_UPLOAD_PRESET = 'i71zczvq'

function upload(file){
    let formData = new FormData();
    formData.append('file',file)
    formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
    return new Promise((resolve,reject) => {

        axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data: formData
          })
          .then((res) => {
            resolve(res)
          })
          .catch(err => reject(err))

    })
}

export default {
    upload
}