const cheerio = require('cheerio')

module.exports = ({ source, tags }) => post => ({
  _id: 'patreon:' + post.id,
  source,
  tags,
  
  text: post.attributes.title + '\n\n' + cheerio.load(post.attributes.content).text(),
  url: post.attributes.url,
  imageUrl: post.attributes.image && (post.attributes.image.large_url || post.attributes.image.url)
})