const channelsDb = require('./channels')
const tipsDb = require('./tips')

const getTags = channel => channel.tags || []
const includeArrayCondition = ar => ar.length ? { $in: ar } : undefined
const excludeArrayCondition = ar => ({ $nin: ar })

const factory = channel => ({
  ...channel,
  
  //sentTipsIds: channel.sentTipsIds || [],
  //tags: channel.tags || [],
  
  setTags: (...tags) => new Promise((resolve, reject) => {
    channelsDb.update({ _id: channel._id }, { $set: { tags: tags } }, (err, newChannel) => {
      if (err) reject(err)
      else resolve(factory(newChannel))
    })
  }),
  
  getRandomUnsentTip: ({ tags = [] }) => {
    return new Promise((resolve, reject) => {
      const totalQuery = {}
      
      const filterTags = tags.concat(getTags(channel))
      if (filterTags.length)
        totalQuery.tags = { $in: filterTags }
      
      const remainingQuery = {
        ...totalQuery,
        _id: excludeArrayCondition(channel.sentTipsIds)
      }
      
      tipsDb.count(remainingQuery).exec((err, unsentTipsCount) => {
        if (err)
          return reject(err)
        
        tipsDb.count(totalQuery).exec((err, total) => {
          if (err) 
            return reject(err)
          
          const index = Math.floor(Math.random() * unsentTipsCount)
          const remaining = unsentTipsCount - 1
          
          tipsDb.find(remainingQuery).skip(index).limit(1).exec((err, tips) => {
            if (err)
              return reject(err)
            
            const tip = tips[0]
            resolve({ 
              tip, 
              remaining,
              total,
              current: total - remaining
            })
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

const getChannel = ({ channelId, serverId }) => new Promise((resolve, reject) => {
  channelsDb.findOne({ _id: channelId, serverId }).exec((err, channel) => {
    if (err) reject(err)
    else if (channel) resolve(factory(channel))
    else
      channelsDb.update({ _id: channelId}, { _id: channelId, serverId, sentTipsIds: [], tags: [] }, { upsert: true }, (err, channel) => {
        if (err) reject(err)
        else resolve(factory(channel))
      })
  })
})


module.exports = {
  getChannel,
  channelFactory: factory
}