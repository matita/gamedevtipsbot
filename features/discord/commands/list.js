const tips = require('../../../models/tips')

module.exports = (message, text) => {
  tips.find({})
    .sort({ createdAt: 1 })
    .limit(10)
    .exec((err, foundTips) => {
      if (err)
        return message.reply('Error\n```\n' + err.message + '\n```')
    
      const rows = ['Here the latest 10 tips']
        .concat(foundTips.map((t, i) => (i + 1) + '. ' + t.text))
      message.channel.send(rows.join('\n'))
    });
}