const Datastore = require('nedb')
const serversDb = new Datastore({
  filename: '.data/servers.db', 
  timestampData: true,
  autoload: true
})

serversDb.find({}).exec((err, ss) => {
  console.log('current servers:\n', ss)
})

module.exports = serversDb