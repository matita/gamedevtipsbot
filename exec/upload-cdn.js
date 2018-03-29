require('dotenv').config()
const tips = require('../models/tips')
const cdn = require('../utils/cloudinary')

tips.find({}, (err, allTips) => {
    if (err)
        return console.error(err)

    const tipsToFix = allTips.filter(t => t.imageUrl && !cdn.isInCdn(t.imageUrl))
    console.log('images to upload to cdn:', tipsToFix.length)
    tipsToFix.forEach(async t => {
        const { imageUrl } = t
        try {
            const res = await cdn.upload(imageUrl)
            const cdnUrl = res.secure_url
            const updatedTip = { ...t, imageUrl: cdnUrl }
            tips.update({ _id: updatedTip._id }, updatedTip, {}, (err, numUpdated) => {
                if (err)
                    return console.error(err)

                console.log('updated tip', updatedTip._id, 'with cdn image')
            })
        } catch (err) {
            console.error(err)
        }
    });
})