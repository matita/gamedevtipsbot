module.exports = (message, text, server) => {
  server.sendTips(message.client)
    .catch(err => message.channel.send('```\n' + err.message + '\n```'))
}