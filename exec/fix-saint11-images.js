require('dotenv').config()
const tips = require('../models/tips')
const cdn = require('../utils/cloudinary')
const user = require('../sources/patreon/users/saint11')

tips.find({ source: 'Pedro Medeiros' }, (err, foundTips) => {
    if (err)
        return console.error(err)

    const tipsToFix = foundTips.filter(t => t.imageUrl && !cdn.isInCdn(t.imageUrl))
    if (!tipsToFix.length)
        return console.log('No tip to fix')

    console.log('found', tipsToFix.length, 'tips to fix')
    const tipsIdsToFix = tipsToFix.map(t => t._id)
    tips.remove({ _id: { $in: tipsIdsToFix }}, { multi: true }, (err, numRemoved) => {
        console.log('removed', numRemoved, 'tips')

        try {
            user.getAllPosts()
        } catch (e) {
            console.error(e)
        }
    })
})