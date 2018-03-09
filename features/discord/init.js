const schedule = require('node-schedule')
const serversDb = require('../../models/servers')
const { getChannel } = require('../../models/channel')
const randomTip = require('./utils/randomTip')

const sendTips = (client) => {
  serversDb
    .find({ defaultChannelId: { $exists: true } })
    .exec((err, servers) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      console.log('running scheduled job')
    
      servers.forEach(async s => {
        const channelId = s.defaultChannelId
        if (!channelId)
          return
        
        const channel = await getChannel(channelId)
        const discordChannel = client.channels.get(channelId)
        
        if (!channel || !discordChannel)
          return
          
        randomTip({ channel, discordChannel })
      })
    })
}

module.exports = client => {
  const job = schedule.scheduleJob('0 30 7 * * *', sendTips.bind(null, client))
  console.log('scheduled job ' + new Date())
}