const { getServer } = require('../../../models/server')
const extractChannels = require('../utils/extractChannels')
const titleCase = require('../../../utils/titleCase')

const requiredPermission = 'MANAGE_CHANNELS'

module.exports = async (message, text, server) => {
  try {
    if (!message.member.hasPermission(requiredPermission))
      return message.reply('who do you think you are? Do you have `' + titleCase(requiredPermission) + '` permission? I don\'t think so')
    
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