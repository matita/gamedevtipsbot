const extractChannels = require('../utils/extractChannels')

module.exports = async (message, text, server) => {
  try {
    const { newText, channelsIds } = extractChannels(text)
    if (!channelsIds.length)
      return message.channel.send('You have to specify the channels to remove, like this:\n```\n' +
                                 '@' + message.client.username + ' remove #channel-name #second.channel-name' +
                                 '\n```')
    
    const numRemoved = await server.removeChannels(channelsIds)
    await message.channel.send('Removed ' + numRemoved + ' channels')
  } catch (err) {
    message.channel.send('```\n' + err.message + '\n```')
  }
}