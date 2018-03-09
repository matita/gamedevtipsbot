module.exports = (message, text, server) => {
  server.allChannels()
    .then(channels => channels.map(c => `<#${c._id}> tags: ${c.tags.join(', ') || '---'}`))
    .then(rows => message.channel.send('Configured channels:\n' + rows.join('\n')))
    .catch(err => message.channel.send('```\n' + err.message  + '\n```'))
}