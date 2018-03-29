const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
    isInCdn: url => url && url.toLowerCase().indexOf('cloudinary') != -1,
    upload: image => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, (err, res) => {
            if (err)
                return reject(err)
            resolve(res)
        })
    })
}