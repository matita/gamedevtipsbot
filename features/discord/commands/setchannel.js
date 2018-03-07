const { getServer } = require('../../../models/server')

module.exports = async (message, text) => {
  const server = await getServer(message.channel.guild.id)
    
  message.channel.send('```\n' + text + '\n```')
}