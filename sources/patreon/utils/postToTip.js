module.exports = ({ source, tags }) => post => ({
  _id: 'patreon:' + post.id,
  source,
  tags
})