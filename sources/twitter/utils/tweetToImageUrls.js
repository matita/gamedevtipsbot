module.exports = tweet => {
  const allMedia = tweet.entities.media
  if (!allMedia)
    return []
  
  return allMedia.map(m => m.media_url_https)
}