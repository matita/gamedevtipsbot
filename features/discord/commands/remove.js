const extractChannels = require('../utils/extractChannels')

module.exports = async (message, text, server) => {
  try {
    const { newText, channelsIds } = extractChannels(text)
    if (!channelsIds.length) {
      message.channel.send('You have to specify the channels to remove, like this:\n```\n' +
                                 '@' + message.client.user.username + ' remove #channel-name #second-channel-name' +
                                 '\n```')
      
      // remove deleted channels
      const channels = await server.allChannels()
      const deletedChannelsIds = channels
        .filter(c => !message.client.channels.get(c._id))
        .map(c => c._id)
      await server.removeChannels(deletedChannelsIds)
      return
    }
    
    const numRemoved = await server.removeChannels(channelsIds)
    await message.channel.send('Removed ' + numRemoved + ' channels')
  } catch (err) {
    message.channel.send('```\n' + err.message + '\n```')
  }
}