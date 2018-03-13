module.exports = (text) => {
  if (!text)
    return text
  
  return text.split(/[_ ]+/)
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
}