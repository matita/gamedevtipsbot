// Pedro Medeiros - Pixelart

const patreon = require('../utils/api')

const getPosts = () => {
  patreon.getPosts({
    'filter[creator_id]': '2279992',
    'filter[user_defined_tags]': 'tutorial',
    'filter[contains_exclusive_posts]': true
  }).then(res => {
    const posts = res.data.data
      .filter(p => p.type === 'post')
  })
}