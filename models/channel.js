const channelsDb = require('./channels')
const tipsDb = require('./tips')

const getTags = channel => channel.tags || []
const includeArrayCondition = ar => ar.length ? { $in: ar } : undefined
const excludeArrayCondition = ar => ({ $nin: ar })

const factory = channel => ({
  ...channel,
  
  //sentTipsIds: channel.sentTipsIds || [],
  //tags: channel.tags || [],
  
  addTags: (...tags) => {
    return new Promise((resolve, reject) => {
      channel.tags = getTags(channel).concat(tags)
      channelsDb.update({ _id: channel._id }, channel, (err, newChannel) => {
        if (err) reject(err)
        else resolve(factory(newChannel))
      })
    })
  },
  
  getRandomUnsentTip: () => {
    return new Promise((resolve, reject) => {
      const remainingQuery = {
        _id: excludeArrayCondition(channel.sentTipsIds),
        tags: includeArrayCondition(getTags(channel))
      }
      
      const totalQuery = { tags: includeArrayCondition(getTags(channel)) }
      
      console.log('remainingQuery', remainingQuery)
      
      tipsDb.find(remainingQuery).exec((err, unsentTips) => {
        if (err)
          return reject(err)
        
        tipsDb.find(totalQuery).exec((err, total) => {
          if (err) 
            return reject(err)
          const index = Math.floor(Math.random() * unsentTips.length)
          const tip = unsentTips[index]
          const remaining = unsentTips.length - 1
          resolve({ 
            tip, 
            remaining,
            total,
            current: total - remaining
          })
        })
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
      channelsDb.insert({ _id: channelId, sentTipsIds: [], tags: [] }, (err, channel) => {
        if (err) reject(err)
        else resolve(factory(channel))
      })
  })
})


module.exports = {
  getChannel
}