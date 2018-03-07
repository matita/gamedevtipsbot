module.exports = (message, text) => {
  message.channel.send('```\n' + text + '\n```')
}