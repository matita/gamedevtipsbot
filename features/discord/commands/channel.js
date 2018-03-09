const { getServer } = require('../../../models/server')
const extractChannels = require('../utils/extractChannels')

module.exports = async (message, text, server) => {
  try {
    const { newText, channelsIds } = extractChannels(text)
    const channelId = channelsIds[0]
    if (!channelId)
      return message.channel.send('You have to specify a channel like this:\n```\nchannel #channel-name [space-separated tags]\n```')
    
    const tags = newText.toLowerCase().split(/\s+/)
      .filter(t => !!t)

    const channel = await server.getChannel(channelId)
    const newChannel = await channel.setTags(tags)
    console.log('newChannel', newChannel)
    message.channel.send('I\'ll send tips' + 
                         (tags.length ? ' with tags ' + newChannel.tags.map(t => `*${t}*`).join(', ') : '') +
                         ` to <#${channelId}> every day`)
  } catch (err) {
    message.channel.send('```\n' + err + '\n```')
  }
}