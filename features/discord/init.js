const serversDb = require('../../models/servers')
const tipsDb = require('../../models/tips')
const tipToEmbed = require('./utils/tipToEmbed')

module.exports = client => {
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
          
          tipsDb.find({}).exec((err, allTips) => {
            if (err)
              return console.error('Error while searching for all tips')
            
            const index = Math.floor(Math.random() * allTips.length)
            const tip = allTips[index]
            channel.send({ embed: tipToEmbed(tip) })
          })
        })
      }, 10000)
    })
}