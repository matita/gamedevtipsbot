const tweetToTip = require('../utils/tweetToTip')
const tips = require('../../../models/tips')

const userId = '2490064238'

const init = twit => {
  console.log('Retrieveing tweets for ' + userId, __filename)
  twit.get('statuses/user_timeline', { user_id: userId, count: 200, tweet_mode: 'extended' }, (err, tweets, res) => {
    if (err)
      return console.error(err)

    const newTips = tweets.map(tweet => tweetToTip({ tweet, source: 'tips4unity', tags: ['unity'] }))
    
    newTips.forEach(t => {
      tips.update({ _id: t._id }, t, { upsert: true }, (err, updatedCount, upsert) => {
        if (err)
          return console.error('Error while upserting tip ' + t._id, err)
        
        if (upsert)
          console.log('inserted new tip ' + t._id)
        else if (updatedCount != 0)
          console.log('updated tip ' + t._id)
      })
    })
  })
}

const receivedTweet = (tweet, twit) => {}

module.exports = {
  userId,
  init,
  receivedTweet
}