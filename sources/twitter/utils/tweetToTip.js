module.exports = ({ tweet, source, tags }) => ({
  _id: 'tw:' + tweet.id_str,
  source: source,
  text: tweet.full_text,
  tags: tags
})