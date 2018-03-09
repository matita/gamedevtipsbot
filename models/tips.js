const Datastore = require('nedb')
const tips = new Datastore({ 
  filename: '.data/tips.db', 
  timestampData: true,
  autoload: true})

const saveTip = t => {
  tips.update({ _id: t._id }, t, { upsert: true }, (err, updatedCount, upsert) => {
    if (err)
      return console.error('Error while upserting tip ' + t._id, err)

    if (upsert)
      console.log('inserted new tip ' + t._id)
  })
}

tips.saveTip = saveTip

module.exports = tips