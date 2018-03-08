const tipToEmbed = require('./tipToEmbed')

module.exports = ({ channel, discordChannel, tip }) => Promise.all([
  channel.sendTip(tip),
  discordChannel.send({ embed: tipToEmbed(tip) })
])