// http://blog.studiominiboss.com/pixelart
const axios = require('axios')
const cheerio = require('cheerio')
const imageToTip = ({ text, url, imageUrl }) => ({
  _id: 'web:pixelart:' + text.replace(/\s+/g, '-'),
  source: 'pedro-medeiros',
  text,
  url,
  imageUrl,
  tags: ['art', 'pixelart']
})

const url = 'http://blog.studiominiboss.com/pixelart'

const getTips = html => {
  const $ = cheerio.load(html)
  const container = $('#content article')
  
  let i = 0
  const tips = []
  let currentTip
  
  container.find('p').each((i, p) => {
    const $p = $(p)
    const text = $p.text().trim()
    if (text.match(/^#\s*\d+/)) {
      const $a = $p.find('a').first()
      currentTip = {
        text: $a.text().trim(),
        url: $a.attr('href')
      }
      tips.push(currentTip)
    }
    
    if (currentTip) {
      const $img = $p.find('img').first()
      if ($img.length) {
        currentTip.imageUrl = $img.attr('src')
        currentTip = null
      }
    }
  })
  
  console.log(tips.map((t, i) => (i) + '. ' + t.text + ' ' + t.imageUrl).join('\n'))
}

const load = () => axios.get(url)
  .then(res => getTips(res.data))

module.expors = load/*()*/

