const { getChannel } = require('../../../models/channel')
const randomTip = require('../utils/randomTip')

module.exports = async (message, text) => {
  const discordChannel = message.channel
  const tags = text.toLowerCase().trim().split(/\s+/)
  
  try {
    const channel = await getChannel(discordChannel.id)
    randomTip({ channel, discordChannel, tags })
  } catch (err) {
    discordChannel.send('```\n' + err.message + '\n```')
  }
}