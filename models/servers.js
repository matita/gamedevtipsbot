const Datastore = require('nedb')
const serversDb = new Datastore({
  filename: '.data/servers.db', 
  timestampData: true,
  autoload: true
})

module.exports = serversDb