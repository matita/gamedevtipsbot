const tips = require('../../../models/tips')
const textInChunks = (text, chunkLength) => text.match(new RegExp('(.|\n){1,' + chunkLength + '}', 'gm'))

module.exports = (message, text) => {
  const countMatch = text.match(/\b(\d+)\b/)
  const maxCount = 20
  const count = countMatch ? Math.min(countMatch[1], maxCount) : 5
  
  tips.find({})
    .sort({ createdAt: -1 })
    .limit(count)
    .exec(async (err, foundTips) => {
      if (err)
        return message.reply('Error\n```\n' + err.message + '\n```')
    
      const rows = [`Here the latest ${count} tips:`]
        .concat(foundTips.map((t, i) => (i + 1) + '. ' + t.text))
      const output = rows.join('\n\n')
      const chunks = textInChunks(output, 2000)
      
      try {
        let chunk
        while (chunk = chunks.shift())
          await message.channel.send(chunk)
      } catch (e) {
        message.channel.send('```\n' + e.message + '\n```')
      }
      
      
    });
}