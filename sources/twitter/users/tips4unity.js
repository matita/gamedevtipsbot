const userId = '2490064238'

const init = twit => {
  console.log('Retrieveing tweets for ' + userId)
  twit.get('statuses/user_timeline', { user_id: userId, count: 200, tweet_mode: 'extended' }, (err, tweets, res) => {
    if (err)
      return console.error(err)

    const episodes = tweets.map(toChallengeEpisode)
    episodes.forEach(e => add('pixel_dailies', e))
    
    console.log('filtered tweets', filteredTweets.map(/*t => t.text + ' ' + new Date(t.created_at)*/toChallengeEpisode))
  })
}

const receivedTweet = (tweet, twit) => {}

module.exports = {
  userId,
  init,
  receivedTweet
}