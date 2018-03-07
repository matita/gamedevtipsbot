const serversDb = require('../../models/servers')

module.exports = client => {
  serversDb
    .find({ defaultChannelId: { $exists: true } })
    .exec((err, servers) => {
      if (err)
        return console.error('Error while getting registered servers', err)
    
      servers.forEach(s => {
        
      })
    })
}