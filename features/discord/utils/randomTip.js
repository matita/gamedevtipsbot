module.exports = channel => {
  tipsDb.find({}).exec((err, allTips) => {
          if (err)
              return console.error('Error while searching for all tips')
            
            const index = Math.floor(Math.random() * allTips.length)
            const tip = allTips[index]
            channel.send({ embed: tipToEmbed(tip) })
          })
}