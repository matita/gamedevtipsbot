const tips = require('../../../models/tips')

module.exports = (message, text) => {
  const countMatch = text.match(/\b(\d+)\b/)
  const count = countMatch ? countMatch[1] : 5
  
  tips.find({})
    .sort({ createdAt: 1 })
    .limit(count)
    .exec((err, foundTips) => {
      if (err)
        return message.reply('Error\n```\n' + err.message + '\n```')
    
      const rows = [`Here the latest ${count} tips:`]
        .concat(foundTips.map((t, i) => (i + 1) + '. ' + t.text))
      message.channel.send(rows.join('\n\n'))
    });
}