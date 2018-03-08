const Datastore = require('nedb')
const channels = new Datastore({
  filename: '.data/channels.db', 
  timestampData: true,
  autoload: true
})

module.exports = channels