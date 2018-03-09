// Pedro Medeiros - Pixelart

const patreon = require('../utils/api')
const { saveTip } = require('../../../models/tips')
const postToTip = require('../utils/postToTip')({ source: 'Pedro Medeiros', tags: ['art', 'pixelart'] })
const delay = (ms) => () => new Promise((resolve, reject) => setTimeout(()=> resolve(), ms))


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


const getPosts = () => patreon.getPosts({
    'filter[creator_id]': '2279992',
    'filter[user_defined_tags]': 'tutorial',
    'filter[contains_exclusive_posts]': true
  })


const getAllPosts = async () => {
  return
  let iterator = getPosts
  let res
  let i = 0
  try {
    do {
      console.log('getPosts', i++)
      res = await iterator().then(parsePosts)
      iterator = res.next
    } while (res.posts.length)
  } catch (err) {
    console.error('error while getting all Saint11 posts', err)
  }
}

module.exports = getAllPosts()