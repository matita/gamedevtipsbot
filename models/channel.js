const channelsDb = require('./channels')
const tipsDb = require('./tips')

const factory = channel => ({
  ...channel,
  
  sentTipsIds: channel.sentTipsIds || [],
  
  getRandomUnsentTip: () => {
    return new Promise((resolve, reject) => {
      tipsDb.find({ _id: { $nin: channel.sentTipsIds }}).exec((err, unsentTips) => {
        if (err)
          return reject(err)
        
        const index = Math.floor(Math.random() * unsentTips.length)
        const tip = unsentTips[index]
        resolve({ tip, remaining: unsentTips.length - 1 })
      })
    })
  },
  
  sendTip: tip => {
    return new Promise((resolve, reject) => {
      if (channel.sentTipsIds.indexOf(tip._id) !== -1)
        return resolve(factory(channel));

      channel.sentTipsIds.push(tip._id)
      channelsDb.update({ _id: channel._id }, channel, (err, c) => {
        if (err) reject(err)
        else resolve(factory(c))
      })
    })
  }
})

const getChannel = channelId => new Promise((resolve, reject) => {
  channelsDb.findOne({ _id: channelId }).exec((err, channel) => {
    if (err) reject(err)
    else if (channel) resolve(factory(channel))
    else
      channelsDb.insert({ _id: channelId, sentTipsIds: [] }, (err, channel) => {
        if (err) reject(err)
        else resolve(factory(channel))
      })
  })
})


module.exports = {
  getChannel
}