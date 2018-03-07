const serversDb = require('./servers')

const serverFactory = server => ({
  ...server,
  
  setDefaultChannel: (channelId) => {
    server.defaultChannelId = channelId
    return new Promise((resolve, reject) => {
      serversDb.update({ _id: server._id }, server, (err, numUpdated) => {
        if (err)
          return reject(err)
        resolve(serverFactory(server))
      })
    })
  }
  
})

const getServer = (guildId) => new Promise((resolve, reject) => {
  serversDb.findOne({ _id: guildId }).exec((err, s) => {
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