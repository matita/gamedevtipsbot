const schedule = require('node-schedule')
const serversDb = require('../../models/servers')
const randomTip = require('./utils/randomTip')

const sendTips = (client) => {
  serversDb
    .find({ defaultChannelId: { $exists: true } })
    .exec((err, servers) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      console.log('running scheduled job')
    
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
  const job = schedule.scheduleJob('0 */5 * * * *', sendTips.bind(null, client))
  console.log('scheduled job ' + new Date())
}