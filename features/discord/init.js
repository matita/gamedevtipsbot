const schedule = require('node-schedule')
const serversDb = require('../../models/servers')
const channelsDb = require('../../models/channels')
const { getChannel } = require('../../models/channel')
const randomTip = require('./utils/randomTip')

const sendTips = (client) => {
  channelsDb
    .find({})
    .exec((err, channels) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      console.log('running scheduled job')
    
      channels.forEach(async c => {
        const channelId = c._id
        if (!channelId)
          return
        
        const channel = await getChannel({ channelId })
        const discordChannel = client.channels.get(channelId)
        
        if (!channel || !discordChannel)
          return
          
        randomTip({ channel, discordChannel })
      })
    })
}

module.exports = client => {
  const job = schedule.scheduleJob('0 30 7 * * *', sendTips.bind(null, client))
  //const job = schedule.scheduleJob('*/20 * * * * *', sendTips.bind(null, client))
  console.log('scheduled job ' + new Date())
}