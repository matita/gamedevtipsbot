const tweetToTip = require('../utils/tweetToTip')
const tips = require('../../../models/tips')

const userId = '2490064238'

const init = twit => {
  console.log('Retrieveing tweets for ' + userId)
  twit.get('statuses/user_timeline', { user_id: userId, count: 200, tweet_mode: 'extended' }, (err, tweets, res) => {
    if (err)
      return console.error(err)

    const newTips = tweets.map(tweet => tweetToTip({ tweet, source: 'tips4unity' }))
    
    newTips.forEach(t => {
      tips.update({ _id: t._id }, t, { upsert: true }, (err, updatedCount)
    })
    
    console.log('filtered tweets', filteredTweets.map(/*t => t.text + ' ' + new Date(t.created_at)*/toChallengeEpisode))
  })
}

const receivedTweet = (tweet, twit) => {}

module.exports = {
  userId,
  init,
  receivedTweet
}