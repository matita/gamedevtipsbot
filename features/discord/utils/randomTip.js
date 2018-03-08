const tipToEmbed = require('./tipToEmbed')
const sendTip = require('./sendTip')

module.exports = ({ channel, discordChannel }) => 
  channel.getRandomUnsentTip()
    .then(({ tip, current, total }) => sendTip({ channel, discordChannel, tip, text: `Random tip ${current}/${total}` }))