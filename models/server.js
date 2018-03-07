const serversDb = require('./servers')

const serverFactory = server => ({
  ...server,
  setChannel: (channelId) => {
    server.defaultChannelId = channelId
    return new Promise((resolve, reject) => {
      serversDb.update({ _id: server._id }, server, (err, res) => {
        if (err)
      })
    })
  }
})

const getServer = (guildId) => new Promise((resolve, reject) => {
  serversDb.findOne({ _id: guildId }).exec((err, s) => {
    if (err)
      return reject(err)
    
    
  })
})

module.exports = {
  getServer
}