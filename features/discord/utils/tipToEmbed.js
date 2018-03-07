module.exports = tip => ({
  title: tip.source,
  description: tip.text,
  footer: { text: tip.tags.map(t => '#' + t).join(' ') }
})