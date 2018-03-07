module.exports = text => text
  .replace('&lt;', '<')
  .replace('&gt;', '>')
  .replace('&amp;', '&')
  