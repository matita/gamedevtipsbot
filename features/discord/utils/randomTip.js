const tipToEmbed = require('./tipToEmbed')
const sendTip = require('./sendTip')

module.exports = ({ channel, discordChannel }) => 
  channel.getRandomUnsentTip()
    .then(({ tip, remaining }) => sendTip({ channel, discordChannel, tip, text: `Random tip, still ${remaining} to go` }))