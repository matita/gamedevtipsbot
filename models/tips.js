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

/** 
 * @param {string} query 
 * @return {Promise.<Tip>}
 */
tips.search = query => new Promise((resolve, reject) => {
  tips.find({}, (err, items) => {
    if (err)
      return reject(err)

    const terms = query.toLowerCase().split(/\s+/)
    const matchingItems = items.filter(tip => {
      return terms.every(term => {
        return tip.tags.map(t => t.toLowerCase()).indexOf(term) !== -1 ||
          tip.text.toLowerCase().indexOf(term) !== -1
      })
    })
    resolve(matchingItems)
  })
})



module.exports = tips


/**
 * @typedef {Object} Tip
 * @property {string} text
 * @property {string} source
 * @property {Array.<string>} tags
 */