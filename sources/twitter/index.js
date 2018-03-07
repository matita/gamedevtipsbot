const fs = require('fs')
const path = require('path')

const Twitter = require('twit')
const twit = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

// load users to follow
const usersDir = path.resolve(__dirname, 'users')
fs.readdir(usersDir, (err, files) => {
  if (err)
    return console.error('Error while loading twitter users to follow', err)
  
  const users = files.map(f => require(path.resolve(usersDir, f)))
  
  // put users in a dictionary
  const usersDict = users.reduce((d, u) => {
    d[u.userId] = u
    return d
  }, {})
  
  // init users
  users.forEach(u => u.init(twit))
  
  // follow users stream
  const usersIds = users.map(u => u.userId)
  const stream = twit.stream('statuses/filter', { follow: usersIds })
  stream.on('tweet', async incompleteTweet => {
    const tweetAuthorId = incompleteTweet.user.id
    const user = usersDict[tweetAuthorId]
    
    if (!user)
      return
    
    const tweetId = incompleteTweet.id_str
    const tweetRes = await twit.get('statuses/show/' + tweetId, { include_entities: true, tweet_mode: 'extended' })
    const tweet = tweetRes.data
    
    // make the single user process the tweet
    user.receivedTweet(tweet, twit)
  })
})