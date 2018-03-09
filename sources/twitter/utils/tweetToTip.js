const replaceHtml = require('./replaceHtml')
const tweetToLink = require('./tweetToLink')

module.exports = ({ source, tags }) => (tweet) => ({
  _id: 'tw:' + tweet.id_str,
  url: tweetToLink(tweet),
  source: source,
  text: replaceHtml(tweet.full_text),
  tags: tags
})