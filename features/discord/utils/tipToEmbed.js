module.exports = tip => ({
  title: tip.source,
  description: tip.text,
  //image: { url: 'http://78.media.tumblr.com/6717e8d14a5e39f02c7933835f9af992/tumblr_inline_p4ilt5P9Vl1qdiwz3_1280.gif' },
  image: tip.imageUrl ? { url: tip.imageUrl } : null,
  footer: { text: tip.tags.map(t => '#' + t).join(' ') }
})