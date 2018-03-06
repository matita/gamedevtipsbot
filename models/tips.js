const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

/*tips.loadDatabase(err => {
  if (err)
    return console.error(err)
  */
  console.log('tips', tips.find({}, (err, foundTips) => { if (err) console.error(err); console.log(foundTips) }))
/*})*/

tips.count({}, (err, count) => {
  if (err)
    console.error(err)
  // populate with fake data
  if (count <= 0)
    tips.insert([{ text: 'first tip', tags: ['programming'] }, { text: 'second tip', tags: ['art', 'pixelart'] }])
})

module.exports = tips