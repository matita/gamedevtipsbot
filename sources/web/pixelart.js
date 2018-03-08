// http://blog.studiominiboss.com/pixelart
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'http://blog.studiominiboss.com/pixelart'

const getTips = html => {
  const $ = cheerio.load(html)
  const container = $('#content article .copy')
  
  let i = 0
  container.find('p').each(() => {
    const $p = $(this)
    
    console.log((i++) + '. ' + $p.text())
  })
}

const load = () => axios.get(url)
  .then(res => getTips(res.data))

module.expors = load()

