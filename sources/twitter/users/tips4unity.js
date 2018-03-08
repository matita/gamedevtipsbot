const tweetToTip = require('../utils/tweetToTip')({ source: 'tips4unity', tags: ['unity'] })
const tips = require('../../../models/tips')

const userId = '2490064238'

const saveTip = t => {
  tips.update({ _id: t._id }, t, { upsert: true }, (err, updatedCount, upsert) => {
    if (err)
      return console.error('Error while upserting tip ' + t._id, err)

    if (upsert)
      console.log('inserted new tip ' + t._id)
    /*else if (updatedCount != 0)
      console.log('updated tip ' + t._id)*/
  })
}

const init = twit => {
  console.log('Retrieveing tweets for ' + userId, __filename)
  twit.get('statuses/user_timeline', { user_id: userId, tweet_mode: 'extended' }, (err, tweets, res) => {
    if (err)
      return console.error(err)

    console.log('retrieved', tweets.length, 'tweets for', userId, __filename)
    const newTips = tweets.map(tweet => tweetToTip(tweet))
    
    newTips.forEach(saveTip)
  })
}

const receivedTweet = (tweet, twit) => {
  const tip = tweetToTip(tweet)
  saveTip(tip)
}

module.exports = {
  userId,
  init,
  receivedTweet
}