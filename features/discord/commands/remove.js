const extractChannels = require('../utils/extractChannels')

module.exports = (message, text, server) => {
  const { newText, channelsIds } = extractChannels(text)
  if (!channelsIds.length)
    return message.channel.send('You have to specify the channels to remove, like this:\n```\n' +
                               '@' + message.client.username + ' remove #channel-name #second.channel-name' +
                               '\n```')
  
  
}