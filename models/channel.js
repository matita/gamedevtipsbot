const channelsDb = require('./channels')

const factory = channel => ({
  ...channel,
})

const getChannel = channelId => new Promise((resolve, reject) => {
  channelsDb.findOne({ _id: channelId }).exec((err, channel) => {
    if (err) reject(err)
    else if (channel) resolve(channel)
    else
      channelsDb.insert({ _id: channelId, sentTipsIds: [] }).exec((err, channel) => {
        if (err) reject(err)
        else resolve(channel)
      })
  })
})


module.exports = {
  getChannel
}