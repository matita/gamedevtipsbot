const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true })

tips.loadDatabase(err => {
  if (err)
    return console.error(err)
  
  console.log('tips', tips.find({}, (err, foundTips) => { if (err) console.error(err); console.log(foundTips) }))
})

tips.insert([{ text: 'first tip', tags: ['programming'] }, { text: 'second tip', tags: ['art', 'pixelart'] }])

module.exports = tips