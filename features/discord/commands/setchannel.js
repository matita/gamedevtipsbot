module.exports = (message, text) => {
  getServer()
  message.channel.send('```\n' + text + '\n```')
}