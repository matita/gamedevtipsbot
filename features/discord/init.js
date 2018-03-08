const schedule = require('node-schedule')
const serversDb = require('../../models/servers')
const randomTip = require('./utils/randomTip')

const sendTips = () => {
  serversDb
    .find({ defaultChannelId: { $exists: true } })
    .exec((err, servers) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      servers.forEach(s => {
        const channelId = s.defaultChannelId
        if (!channelId)
          return
        const channel = client.channels.get(channelId)
        if (!channel)
          return
          
        randomTip(channel)
      })
    })
}

module.exports = client => {
  const job = schedule.scheduleJob('30 * * * *', sendTips)
}