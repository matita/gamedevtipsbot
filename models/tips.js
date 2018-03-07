const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

module.exports = tips