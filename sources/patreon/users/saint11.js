// Pedro Medeiros - Pixelart

const patreon = require('../utils/api')
const { saveTip } = require('../../../models/tips')
const postToTip = require('../utils/postToTip')({ source: 'Pedro Medeiros', tags: ['art', 'pixelart'] })


const parsePosts = res => {
  const posts = res.data.data
    .filter(p => p.type === 'post')
  const tips = posts.map(postToTip)

  tips.forEach(saveTip)
  return {
    posts,
    tips,
    first: res.first,
    next: res.next
  }
}


const getPosts = () => {
  patreon.getPosts({
    'filter[creator_id]': '2279992',
    'filter[user_defined_tags]': 'tutorial',
    'filter[contains_exclusive_posts]': true
  }).then(parsePosts)
}


const getAllPosts = async () => {
  let iterator = getPosts
  let res
  do {
    res = await iterator()
    iterator = res.next
  } while (res.posts.length)
}

module.exports = getPosts()