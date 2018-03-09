const { getServer } = require('../../../models/server')

module.exports = async (message, text, server) => {
  try {
    const channelId = server.defaultChannelId
    if (!channelId)
      return message.channel.send('No default channel set')
    message.channel.send(`Default channel is <#${channelId}>`)
  } catch (err) {
    message.channel.send('```\n' + err + '\n```')
  }
}