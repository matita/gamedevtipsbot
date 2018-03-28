// Pedro Medeiros - Pixelart

const schedule = require('node-schedule')
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
  //return
  let iterator = getPosts
  let res
  let i = 0
  try {
    do {
      console.log('getPosts', i++)
      res = await iterator().then(parsePosts)
      console.log('posts.length', res.posts.length, res.posts.map(p => p.id))
      iterator = res.next
      await delay(5000)()
    } while (res.posts.length)
    console.log('took all posts')
  } catch (err) {
    console.error('error while getting all Saint11 posts', err)
  }
}

const getLatestPosts = () => getPosts()
  .then(parsePosts)


const init = () => {
  schedule.scheduleJob('0 10 2 * * *', async () => {
    try {
      await getLatestPosts()
    } catch (err) {
      console.error('Error while getting latest Pedro Medeiros posts', err)
    }
  })
}

module.exports = {
  dummy: init(),
  getLatestPosts,
  getAllPosts
}