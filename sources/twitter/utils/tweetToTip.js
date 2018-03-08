const replaceHtml = require('./replaceHtml')

module.exports = ({ source, tags }) => (tweet) => ({
  _id: 'tw:' + tweet.id_str,
  source: source,
  text: replaceHtml(tweet.full_text),
  tags: tags
})