const tips = require('../../../models/tips')

module.exports = (message, text) => {
  tips.find({})
    .sort({ createdAt: 1 })
    .limit(10)
    .exec((err, foundTips) => {
      if
    });
}