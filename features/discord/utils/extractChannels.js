const channelRE = /<#(\d+)>/

const getChannelsIds = text => {
  text.match(channelRE)
}

module.exports = text => ({
  newText: text.replace(channelRE, ''),
  channelsIds: text.match
})