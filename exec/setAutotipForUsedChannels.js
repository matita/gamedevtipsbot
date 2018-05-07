const channels = require('../models/channels')

channels.find({ autotip: { $ne: true }}, (err, chs) => {
    if (err)
        return console.error(err)

    const alreadyUsedChannels = chs.filter(c => c.sentTipsIds && c.sentTipsIds.length != 0)
    if (!alreadyUsedChannels.length)
        return console.log('Set autotip: true, no channel to fix');

    const channelsIds = alreadyUsedChannels.map(c => c._id)
    console.log('used channels:', alreadyUsedChannels.length)
    channels.update({ _id: { $in: channelsIds }}, { $set: { autotip: true }}, { multi: true }, (err, numUpdated) => {
        if (err)
            return console.error('Error while fixing autotip', err)
        console.log('set autotip: true to', numUpdated, 'channels')
    })
})