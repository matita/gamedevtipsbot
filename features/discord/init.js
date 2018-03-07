const serversDb = require('../../models/servers')
const randomTip = require('./utils/randomTip')

module.exports = client => {
  return;
  serversDb
    .find({ defaultChannelId: { $exists: true } })
    .exec((err, servers) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      let count = 5
      const i = setInterval(() => {
        if (count <= 0)
          return 
        count--
          
        servers.forEach(s => {
          const channelId = s.defaultChannelId
          if (!channelId)
            return
          const channel = client.channels.get(channelId)
          if (!channel)
            return
          
          randomTip(channel)
        })
      }, 10000)
    })
}