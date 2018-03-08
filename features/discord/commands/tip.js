const { getChannel } = require('../../../models/channel')
const randomTip = require('../utils/randomTip')

module.exports = async (message, text) => {
  const discordChannel = message.channel
  
  try {
    const channel = await getChannel(discordChannel.id)
    randomTip({ channel, discordChannel })
  } catch (err) {
    discordChannel.send('```\n' + err.message + '\n```')
  }
}