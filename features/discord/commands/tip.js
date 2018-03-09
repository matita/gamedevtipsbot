const { getChannel } = require('../../../models/channel')
const randomTip = require('../utils/randomTip')

module.exports = async (message, text) => {
  const tags = text.toLowerCase().trim().split(/\s+/)
    .filter(t => !!t) // filter out empty strings
  
  const discordChannel = message.channel
  
  try {
    const channel = await getChannel({ channelId: discordChannel.id })
    randomTip({ channel, discordChannel, tags })
  } catch (err) {
    discordChannel.send('```\n' + err.message + '\n```')
  }
}