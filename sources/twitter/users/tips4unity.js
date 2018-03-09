const tweetToTip = require('../utils/tweetToTip')({ source: 'tips4unity', tags: ['unity'] })
const { saveTip } = require('../../../models/tips')

const userId = '2490064238'

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