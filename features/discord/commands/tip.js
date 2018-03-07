const randomTip = require('../utils/randomTip')

module.exports = (message, text) => {
  randomTip(message.channel)
}