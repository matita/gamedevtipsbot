const tipToEmbed = require('./tipToEmbed')

module.exports = ({ channel, discordChannel, tip, text }) => Promise.all([
  channel.sendTip(tip),
  discordChannel.send(text, { embed: tipToEmbed(tip) })
])