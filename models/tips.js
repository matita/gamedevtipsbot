const cdn = require('../utils/cloudinary')
const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

const saveTip = async t => {
  tips.update({ _id: t._id }, t, { upsert: true }, async (err, updatedCount, upsert) => {
    if (err)
      return console.error('Error while upserting tip ' + t._id, err)

    if (upsert) {
      console.log('inserted new tip ' + t._id)

      const imageUrl = t.imageUrl
      if (imageUrl && !cdn.isInCdn(imageUrl)) {
        const cdnImage = await cdn.upload(imageUrl)
        const cdnUrl = cdnImage.secure_url
        console.log('uploaded image to cdn:\n- source:', imageUrl, '\n- cdn:', cdnUrl, '\n')
        const cdnTip = { ...t, imageUrl: cdnUrl }
        saveTip(cdnTip)
      }
    }
  })
}

tips.saveTip = saveTip

module.exports = tips