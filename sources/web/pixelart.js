// http://blog.studiominiboss.com/pixelart
const axios = require('axios')
const cheerio = require('cheerio')
const addTip = 

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
      currentTip = {}
      tips.push(currentTip)
    }
    
    console.log((i++) + '. ' + $p.text())
  })
}

const load = () => axios.get(url)
  .then(res => getTips(res.data))

module.expors = load()

