const { getServer } = require('../../../models/server')
const extractChannels = require('../utils/extractChannels')

module.exports = async (message, text) => {
  try {
    const { newText, channelsIds } = extractChannels(text)
    const channelId = channelsIds[0]
    if (!channelId)
      return message.channel.send('You have to specify a channel like this: `setchannel #channel-name`')

    const server = await getServer(message.channel.guild.id)
    await server.setDefaultChannel(channelId)
    message.channel.send(`Set <#${channelId}> as default channel`)
  } catch (err) {
    message.channel.send('```\n' + err + '\n```')
  }
}