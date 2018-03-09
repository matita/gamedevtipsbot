// http://unitytip.com/

const axios = require('axios')
const cheerio = require('cheerio')
const htmlToMarkdown = new require('turndown')()
const { saveTip } = require('../../models/tips')

const url = 'http://unitytip.com/'

const htmlToTips = html => {
  const $ = cheerio.load(html)
  
  return $('#msnry .item')
    .map((i, d) => $(d)).get()
    .map($d => ({
      _id: 'unitytip:' + $d.attr('id'),
      source: 'Unity Tip',
      url: url + '#' + $d.attr('id'),
      text: htmlToMarkdown.turndown($d.find('p').html()),
      tags: ['unity']
    }))
}

const fetchPosts = () => axios.get(url)
  .then(res => htmlToTips(res.data))
  .then(tips => tips.forEach(saveTip))

const init = () => {
  fetchPosts()
    .catch(err => console.error('Error while fetching Unity Tip posts', err))
}

module.exports = init()

