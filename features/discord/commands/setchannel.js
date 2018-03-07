const { getServer } = require('../../../models/server')
const extractChannels = require('../utils/extractChannels')

module.exports = async (message, text) => {
  const { newText, channelsIds } = extractChannels(text)
  const server = await getServer(message.channel.guild.id)
    
  message.channel.send('```\n' + text + '\n```')
}