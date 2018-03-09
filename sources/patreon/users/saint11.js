// Pedro Medeiros - Pixelart

const patreon = require('../utils/api')
const postToTip = require('../utils/postToTip')({ source: 'Pedro Medeiros', tags: ['art', 'pixelart'] })

const getPosts = () => {
  patreon.getPosts({
    'filter[creator_id]': '2279992',
    'filter[user_defined_tags]': 'tutorial',
    'filter[contains_exclusive_posts]': true
  }).then(res => {
    const posts = res.data.data
      .filter(p => p.type === 'post')
    const tips = posts.map(postToTip)
    
    console.log('Pedro Medeiros tips\n\n', tips)
  })
}

module.exports = getPosts()