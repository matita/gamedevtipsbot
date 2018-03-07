const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

//tips.find({}, (err, foundTips) => { if (err) console.error(err); console.log(foundTips) })

tips.remove({ source: { $exists: false } }, { multi: true }, (err, numRemoved) => {
  if (err)
    return console.error('error while removing tips without source', err)
  
  console.log('removed', numRemoved, 'tips without source')
})

module.exports = tips