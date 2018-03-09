const tipToEmbed = require('./tipToEmbed')
const sendTip = require('./sendTip')

module.exports = ({ channel, discordChannel, tags }) => 
  channel.getRandomUnsentTip({ tags })
    .then(({ tip, current, total }) => tip && 
          sendTip({ channel, discordChannel, tip, text: `Random tip ${current}/${total}` + (tags && tags.length ? ' filtered on ' + tags.join(', ') : '') }))