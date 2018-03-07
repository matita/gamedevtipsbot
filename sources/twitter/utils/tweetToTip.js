module.exports = ({ tweet, source }) => ({
  _id: 'tw:' + tweet.id_str,
  source: source,
  text: tweet.full_text
})