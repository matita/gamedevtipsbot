const cdn = require('../utils/cloudinary')
const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

const saveTip = t => {
  tips.findOne({ _id: t._id }, async (err, existingTip) => {
    if (err)
      return console.error(err);

    if (existingTip)
      return;

    try {
      const imageUrl = t.imageUrl
      if (imageUrl && !cdn.isInCdn(imageUrl)) {
        const cdnImage = await cdn.upload(imageUrl)
        const cdnUrl = cdnImage.secure_url
        console.log('uploaded image to cdn:\n- source:', imageUrl, '\n- cdn:', cdnUrl, '\n')
        t.imageUrl = cdnUrl;
      }

      tips.insert(t, (err, insertedTip) => {
        if (err)
          return console.error(err);

          console.log('inserted new tip ' + t._id)
      })
    } catch (e) {
      console.error(e)
    }
  })
}

tips.saveTip = saveTip

module.exports = tips