const serversDb = require('./servers')
const channelsDb = require('./channels')
const { getChannel, channelFactory } = require('./channel')

const serverFactory = server => ({
  ...server,
  
  setDefaultChannel: (channelId) => {
    server.defaultChannelId = channelId
    return new Promise((resolve, reject) => {
      serversDb.update({ _id: server._id }, server, (err, numUpdated) => {
        if (err)
          return reject(err)
        if (!numUpdated)
          return reject(`No server updated with id ${server._id}`)
        resolve(serverFactory(server))
      })
    })
  },
    
  getChannel: (channelId) => getChannel({ serverId: server._id, channelId }),
    
  allChannels: () => new Promise((resolve, reject) => {
    console.log('serverId', server._id)
    channelsDb.find({ serverId: server._id }).exec((err, channels) => {
      if (err) reject(err)
      else resolve(channels.map(channelFactory))
    })
  })
  
})

const getServer = (guildId) => new Promise((resolve, reject) => {
  serversDb.findOne({ _id: ''+guildId }).exec((err, s) => {
    if (err) 
      reject(err)
    else if (s)
      resolve(serverFactory(s))
    else
      serversDb.insert({ _id: guildId }, (err, s) => {
        if (err) reject(err)
        else resolve(serverFactory(s))
      })
  })
})

module.exports = {
  getServer
}